
import { useEffect, useState } from "react";
import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon.jsx";

function PokemonList() {

    const [pokemonList, setpokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pokedex_url,setpokedex_url]= useState('https://pokeapi.co/api/v2/pokemon');
    const [nexturl,setnexturl] = useState('');
    const [prevurl,setprevurl] = useState('');


    async function downloadPokemons() {

        setIsLoading(true);
        const response = await axios.get(pokedex_url);
        const pokemonResult = response.data.results;

        setnexturl(response.data.next);
        setprevurl(response.data.previous);

        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const PokeListres = pokemonData.map((pokedata) => {
            const pokemon = pokedata.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        })
        console.log(PokeListres);
        setpokemonList(PokeListres);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
      
    },[pokedex_url]);

 
    return (
        <div className="w-full text-white  mt-3 flex justify-center flex-col items-center">
            <div className="font-bold text-3xl font-mono "> Pokemon List</div>

            <div className="w-[80%] p-5 flex justify-center flex-wrap">

                { (isLoading) ? 'loading......' : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} id={p.id} />) }

            </div>

            <div className="flex justify-between gap-4">
                <button disabled={ prevurl == null } onClick={()=> setpokedex_url(prevurl)} className="w-32 mb-5  md:w-52 text-white p-2 bg-green-600 rounded-2xl font-bold font-mono " > ⏮️ Previous</button>
                <button disabled={ nexturl == null} onClick={()=> setpokedex_url(nexturl)} className="w-32 mb-5  md:w-52 text-white p-2 bg-green-600 rounded-2xl font-bold font-mono " >Next ⏭️ </button>
            </div>
        </div>
    )
}
export default PokemonList;