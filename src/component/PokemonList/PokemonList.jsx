
import Pokemon from "../Pokemon/Pokemon.jsx";
import usePokemonList from "../../Hooks/usePokemonList.js";

function PokemonList() {

    const { pokemonListState,setpokemonListState }=usePokemonList();

 
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