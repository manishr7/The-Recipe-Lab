import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js"; 
import recipeRoute from "./Routes/recipeRoutes.js";
const app=express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.get("/",(req,res)=>
{
    res.send("<h1>DEPLOYED!<h1/>");
})
app.use("/api/auth", authRoutes); // For authentication routes
app.use("/api", recipeRoute);    

const Port=process.env.Port;
const Url=process.env.MongoUrl;
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(Url);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

connectDB().then(() => {
  app.listen(Port, () => {
      console.log(`Server running at http://localhost:${Port}`);
  })
})