import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Recipes from "../Pages/Recipes/Recipes";
import Signin from "../Pages/Auth/Signin";
import Signup from "../Pages/Auth/Signup";
import RecipeDetails from "../Pages/Recipes/RecipeDetails";
import SavedRecipes from "../Pages/Recipes/SavedRecipes";
function AllRoutes() {
  return (
    
    <Routes >
      
      <Route path="/" element={<Home  />} />
      <Route path="/auth/login" element={<Signin />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/wishlist" element={<SavedRecipes />} />
      <Route path="/recipes/:category/:id" element={<RecipeDetails />} />


      
      <Route path="/recipes/:category" element={<Recipes />} />

      

      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
}

export default AllRoutes;
