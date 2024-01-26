import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";



function Pokedex() {
    return (
        <div className="w-full flex justify-center items-center flex-col text-center bg-gray-900   ">

            <h1 className="text-yellow-400 text-5xl font-mono font-bold p-2 "> Pokedex </h1>

            <Search />

            <PokemonList />
            
        </div>

    );
}
export default Pokedex;