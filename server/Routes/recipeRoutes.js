import express from "express"
import { addRecipes } from "../Controller/addRecipe.js";
import { getSavedRecipes } from "../Controller/getSavedRecipes.js";
const Route=express.Router();

Route.post("/addrecipe",addRecipes);
Route.get("/getrecipe/:userId", getSavedRecipes);
export default Route;