

function Pokemon({name,image,key}) {
        return(

               <div className="border-2 border-green-400 w-1/4 flex  items-center flex-col justify-between rounded-3xl m-2 hover:bg-gray-700">
                  <div className="font-bold text-xl text-yellow-400 animate-pulse font-mono mt-4">
                     {name}
                  </div>
                  <img className="w-[80%]" src={image} alt="" />
                </div>

           
        );
}

export default Pokemon;