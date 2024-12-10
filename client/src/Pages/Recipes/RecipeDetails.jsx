import React from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { useState,useEffect } from "react";
import axios from "axios";
import { toast,Bounce  } from "react-toastify";
import { useSelector} from "react-redux";
import { debounce } from "lodash";
function RecipeDetails() {
  const location = useLocation();
  const id = location.state;
  const [item, setitem] = useState(null);
  const [loading, setloading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const user=useSelector((state)=> state.Auth.value);
  useEffect(() => {
    setisLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/recipes/${id}/information?apiKey=9b14f3e7a0f24496872a0b9dead9b65f&includeNutrition=false`);
        setitem(response.data);
        console.log(response.data)
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
        setisLoading(false); // Stop loading after everything is done
      }
      
    };
    fetchProducts();
    setisLoading(false);
  }, [id]);
  const handleSaveRecipe = async (item) => {
    setloading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/addrecipe", {
        userId: user.id,
        id: item.id,
        title: item.title,
        readyInMinutes: item.readyInMinutes,
        image: item.image,
        summary: item.summary,
        dishTypes: item.dishTypes,
        healthScore: item.healthScore,
      });
      if(response)
        {toast.success(response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition:Bounce,
        })}
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
    setloading(false);
  };
  return (
    <>
   
    <div className="container mt-32 mx-auto px-4 ">
    {item?(
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <img
            className="w-full rounded-xl shadow-lg  transition-all duration-300 hover:scale-105"
            src={item.image}
            alt={item.title}
          />
          <button
            onClick={() => handleSaveRecipe(item)}
            className="w-full py-3 my-6  bg-indigo-600 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 "
          >
            Save Recipe
          </button>
          {loading ? <Spinner /> : null}
        </div>
        <div className="flex-grow p-3 rounded-lg bg-neutral-300 lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{item.title}</h1>
          <p
            dangerouslySetInnerHTML={{ __html: item.summary }}
            className="text-lg text-gray-700 mb-6"
          ></p>

          <div className="flex items-center text-lg text-gray-700 space-x-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Ready in:</span>
              <span className="font-bold">{item.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Servings:</span>
              <span className="font-bold">{item.servings}</span>
            </div>
          </div>

          <div className=" space-y-4">
            <div className="bg-neutral-200 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Ingredients
              </h2>
              <ul className="list-disc  space-y-2 text-lg">
                {item.extendedIngredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex justify-between mb-4 border p-2 rounded-md border-gray-400"
                  >
                    <span className="justify-self-center text-gray-600 font-semibold">
                      {ingredient.amount} {ingredient.unit}
                    </span>
                    <span className="justify-self-end text-gray-800">
                      {ingredient.nameClean}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Instructions
              </h2>
              <div className="prose text-gray-700 text-lg space-y-2">
                <p dangerouslySetInnerHTML={{ __html: item.instructions }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ):
    (
      <Spinner/>
    )
    }
    </div>
  
    </>
  );
}

export default RecipeDetails;
