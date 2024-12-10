import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import debounce from "lodash.debounce";
import { Link } from 'react-router-dom';


function SearchBar() {
    const [searchQuery, setsearchQuery] = useState("");
    const [filteredProducts, setfilteredProducts] = useState([]);
    const handleInputChange = debounce((value) => {
  setsearchQuery(value);
}, 700);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await axios.get(`/recipes/complexSearch?apiKey=a8fef007e4f4404a8ee5c85760ee488a&query=${searchQuery}&number=10`);
              console.log(response.data);
             setfilteredProducts(response.data.results)
            } catch (error) {
              console.error("Error fetching products:", error);
            }
          };
      
          
          fetchProducts();
    }, [searchQuery])
    
    console.log(searchQuery)
  return (
   
<form className="max-w-xs md:max-w-3xl mx-auto my-16 ">   
    <label htmlFor="default-search" className=" mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className=" absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search"  onChange={(e)=>handleInputChange(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Search Recipes..." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    {searchQuery?
    <div className='max-w-3xl mx-auto max-h-44 overflow-y-auto bg-gray-200' >
        {filteredProducts.length === 0 ? (
      <p className="py-2 px-1 text-gray-500">No Products Found.</p>
    ) : (
      filteredProducts.map((item, index) => (
        <Link state={item.id} to={`/recipes/search/${item.id}`} className="py-2 px-1 h-16 hover:bg-gray-300 flex" key={index}>
          {item.title}
          <img
            className="h-full w-10 my-auto ml-auto mr-3 cursor-pointer hover:scale-150 transition-all duration-300"
            src={item.image}
            alt=""
          />
        </Link>
      ))
    )}
    </div> 
    :<p></p>}
</form>

  )
}

export default SearchBar