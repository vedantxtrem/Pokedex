import { Link } from "react-router-dom";


function Pokemon({name,image,id}) {
        return(
                
                <Link to={`/pokedex/${id}`} className="border-2 border-green-400 w-full md:w-1/4 flex  items-center flex-col justify-between rounded-3xl m-2 hover:bg-gray-700">
                  <div className="font-bold text-sm md:text-xl text-yellow-400 animate-pulse font-mono mt-4">
                     {name}
                  </div>
                  <img className="w-[80%]" src={image} alt="" />
                </Link>

           
        );
}

export default Pokemon;