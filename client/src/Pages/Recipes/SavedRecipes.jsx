import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../../Components/Spinner";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
function SavedRecipes() {
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const user=useSelector((state)=> state.Auth.value);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setisLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://the-recipe-lab-production.up.railway.app/api/getrecipe/${user.id}`);
        setfilteredProducts(response.data);
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
      finally {
        setisLoading(false); 
      }
      
    };
    fetchProducts()
    
  }, []);
  return (
    <div className="mt-32 ">
      <h2 className='text-center text-blue-600 text-5xl font-bold mb-8'>Saved Recipes</h2>
      <div className="mx-auto flex">
        <div className="container flex mx-auto flex-wrap  justify-center gap-10 w-full h-fit py-2 px-8 ">
        {isLoading ? (
    <Spinner />
  ) : filteredProducts && filteredProducts.length > 0 ? (
    filteredProducts.map((item) => {
      return (
        <div
          key={item.id}
          className="max-w-sm h-[30rem] hover:bg-neutral-200 bg-white hover:scale-105 transition-all duration-300 border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <Link
            to={`/recipes/${item.dishTypes?.[0] || 'unknown'}/${item.id}`}
            state={item.id}
          >
            <img
              className="rounded-t-lg h-1/2 w-full"
              src={item.image || "placeholder-image.jpg"} // Add a fallback image
              alt={item.title || "Recipe"}
            />
          </Link>
          <div className="p-5 flex flex-col h-1/2">
            <Link
              to={`/recipes/${item.dishTypes?.[0] || 'unknown'}/${item.id}`}
              state={item.id}
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title || "Untitled Recipe"}
              </h5>
            </Link>
            <div className="mb-3 w-full flex-grow overflow-y-auto">
              <p
                dangerouslySetInnerHTML={{ __html: item.summary || "No summary available." }}
                className="font-normal text-gray-700 dark:text-gray-400"
              ></p>
            </div>
            <Link
              to={`/recipes/${item.dishTypes?.[0] || 'unknown'}/${item.id}`}
              state={item.id}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              <p className="justify-self-start">
                Health Score: {item.healthScore || "N/A"}
              </p>
              <p className="justify-self-end">
                Ready In Minutes: {item.readyInMinutes || "N/A"}
              </p>
            </Link>
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-center text-gray-600 mt-16">No Saved Recipes Found.</p>
  )}
        </div>
      </div>
    </div>
  );
}

export default SavedRecipes;
