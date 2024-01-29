import { useState,useEffect } from "react";
import axios from "axios";


function usePokemonList (){

    
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

    return {pokemonListState,setpokemonListState}
}
export default usePokemonList;