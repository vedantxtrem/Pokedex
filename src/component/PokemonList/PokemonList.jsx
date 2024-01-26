
import { useEffect, useState } from "react";
import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon.jsx";

function PokemonList() {

    const [pokemonList, setpokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemons() {

        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonResult = response.data.results;
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
      
    },[]);

 
    return (
        <div className="w-full text-white  mt-3 flex justify-center flex-col items-center">
            <div className="font-bold text-3xl font-mono "> Pokemon List</div>

            <div className="w-[80%] p-5 flex justify-center flex-wrap">

                { (isLoading) ? 'loading......' : pokemonList.map((p) => <Pokemon name={p.name} image={p.image}  />) }

            </div>

            <div className="flex justify-between gap-4">
                <button className="w-52 text-white p-2 bg-green-600 rounded-2xl font-bold font-mono " > ⏮️ Previous</button>
                <button className="w-52 text-white p-2 bg-green-600 rounded-2xl font-bold font-mono " >Next ⏭️ </button>

                
            </div>
        </div>
    )
}
export default PokemonList;