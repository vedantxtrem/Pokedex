import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setpokemon] = useState({});

    async function downloadPokemons() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setpokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
        })
    }

    useEffect(() => {
        downloadPokemons();
    }, []);

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center flex-col text-center bg-gray-900 text-white ">
                <div className="border-2 border-green-400 w-fit p-10 flex  flex-col justify-between rounded-3xl m-2 hover:bg-gray-700">
                    <div className="font-thin text-2xl font-mono ">Name : {pokemon.name}</div>
                    <img className="" src={pokemon.image} alt="" />
                    <div className="font-thin text-2xl font-mono ">Weight : {pokemon.weight}</div>
                    <div className="font-thin text-2xl font-mono ">Height : {pokemon.height}</div>
                    <div className="font-thin text-2xl font-mono ">Types : {pokemon.types}</div>
                </div>

            </div>
        </>
    )
}
export default PokemonDetails;