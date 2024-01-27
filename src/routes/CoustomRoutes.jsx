import { Route, Routes } from "react-router-dom"
import Pokedex from "../component/Pokedex/Pokedex"
import PokemonDetails from "../component/PokemonDetails/PokemonDetails"



function CoustomRoutes() {

    return (
        <>
        
        <Routes>
            <Route path="/pokemon/" element={<Pokedex />} />
            <Route path="/Pokemon/:id" element={<PokemonDetails />} />
        </Routes>

        </>
    );
}
export default CoustomRoutes;