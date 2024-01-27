import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";



function Pokedex() {
    return (
        <div className="w-full h-full flex justify-center items-center flex-col text-center bg-gray-900   ">
            <Search />
            <PokemonList />

        </div>

    );
}
export default Pokedex;