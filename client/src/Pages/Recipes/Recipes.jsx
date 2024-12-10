import React from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import axios from "axios";
import { toast,Bounce  } from "react-toastify";
import { debounce } from "lodash";
function Recipes() {
  const { category, id } = useParams();
  const [filteredProducts, setfilteredProducts] = useState([]);
  console.log(category, id);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
  
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setisLoading(true);
    if (category) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `/recipes/complexSearch?apiKey=9b14f3e7a0f24496872a0b9dead9b65f&number=50&type=${category}&addRecipeInformation=true`
          );
          setfilteredProducts(response.data.results);
          setisLoading(false);
        } catch (error) {
          toast.error(error.response.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
        }
      };
      const debouncedFetchProducts = debounce(fetchProducts, 300);
      debouncedFetchProducts();
    } else {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `/recipes/random?apiKey=9b14f3e7a0f24496872a0b9dead9b65f&number=50`
          );
          setfilteredProducts(response.data.recipes);
          setisLoading(false);
        } catch (error) {
          toast.error(error.response.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
        }
      };
      const debouncedFetchProducts = debounce(fetchProducts, 300);
      debouncedFetchProducts();
    }
  }, [category]);
  return (
    <div className="pt-10 ">
      <SearchBar />
      <div className="mx-auto flex">
        <div className="container flex mx-auto flex-wrap  justify-center gap-10 w-full h-fit py-2 px-8 ">
          {isLoading ? (
            <Spinner />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((item) => {
              return (
                <div key={item.id} className="max-w-sm h-[30rem] hover:bg-neutral-200 bg-white hover:scale-105 transition-all duration-300 border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Link
                    to={`/recipes/${category ? category : item.dishTypes[0]}/${
                      item.id
                    }`}
                    state={item.id}
                  >
                    <img
                      className="rounded-t-lg h-1/2 w-full "
                      src={item.image}
                      alt=""
                    />
                  </Link>
                  <div className="p-5 flex flex-col h-1/2">
                    <Link
                      to={`/recipes/${category ? category : item.dishTypes[0]}/${
                      item.id}`}
                      state={item.id}
                    >
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.title}
                      </h5>
                    </Link >
                    <div className="mb-3 w-full flex-grow overflow-y-auto">
                      <p
                        dangerouslySetInnerHTML={{ __html: item.summary }}
                        className=" font-normal text-gray-700 dark:text-gray-400"
                      ></p>
                    </div>
                    <Link
                      to={`/recipes/${category ? category : item.dishTypes[0]}/${
                      item.id
                    }`}
                    state={item.id}
                      className="flex items-center justify-between px-3 py-2 text-sm font-medium  text-white bg-gray-700 rounded-lg hover:bg-gray-800  dark:bg-gray-600 dark:hover:bg-gray-700 "
                    >
                      <p className="justify-self-start">Health Score: {item.healthScore}</p>
                      <p className="justify-self-end">Ready In Minutes: {item.readyInMinutes}</p>
                    
                      
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>NO PRODUCTS FOUND</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
