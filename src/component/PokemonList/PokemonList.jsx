
import { useEffect, useState } from "react";
import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon.jsx";

function PokemonList() {

    const [pokemonListState,setpokemonListState]=useState({
        pokemonList:[],
        isLoading: true,
        pokedex_url:'https://pokeapi.co/api/v2/pokemon',
        nexturl:'',
        prevurl:'',

    })
    
    async function downloadPokemons() {

        setpokemonListState((state)=>({...state ,isLoading:true}));

        const response = await axios.get(pokemonListState.pokedex_url);
        const pokemonResult = response.data.results;
        console.log(pokemonResult);

        setpokemonListState((state)=> ({
            ...state,
            nexturl:response.data.next,
            prevurl:response.data.previous
        }));

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
        setpokemonListState((state)=> ({...state, pokemonList:PokeListres , isLoading:false}));
    }

    useEffect(() => {
        downloadPokemons();
      
    },[pokemonListState.pokedex_url]);

 
    return (
        <div className="w-full text-white  mt-3 flex justify-center flex-col items-center">
            <div className="font-bold text-3xl font-mono "> Pokemon List</div>

            <div className="w-[80%] p-5 flex justify-center flex-wrap">

                { ( pokemonListState.isLoading ) ? 'loading......' : pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} id={p.id} />) }

            </div>

            <div className="flex justify-between gap-4">
                <button disabled={ pokemonListState.prevurl == null } onClick={()=> {
                    const urlToSet = pokemonListState.prevurl;
                    setpokemonListState({...pokemonListState,pokedex_url: urlToSet})}} className="w-32 mb-5  md:w-52 text-white p-2 bg-green-600 rounded-2xl font-bold font-mono " > ⏮️ Previous</button>
                <button disabled={ pokemonListState.nexturl == null} onClick={()=> {
                    const urlToSet = pokemonListState.nexturl;
                    setpokemonListState({...pokemonListState,pokedex_url: urlToSet})}} className="w-32 mb-5  md:w-52 text-white p-2 bg-green-600 rounded-2xl font-bold font-mono " >Next ⏭️ </button>
            </div>
        </div>
    )
}
export default PokemonList;