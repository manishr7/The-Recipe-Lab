import express from "express"
import { login } from "../Controller/login.js"; 
import { register } from "../Controller/register.js";
import { verify } from "../Controller/verify.js";
const Route=express.Router();

Route.post("/login",login);
Route.post("/register",register)
Route.post("/verify",verify)
export default Route;