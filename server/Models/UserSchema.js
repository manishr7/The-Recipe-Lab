import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Recipe from "./recipesSchema.js";
const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    
  },
  Email: {
    type: String,
    required: true,
    
  },
  Password: {
    type: String,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    default: false,
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",  
    },
  ],
  
});
UserSchema.pre('save', async function (next) {
  if (this.isModified('Password')) {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  next();
});
UserSchema.methods.generateToken=function()
{
  try {
    return jwt.sign({
      userId:this._id.toString(),
      Email:this.Email,
      Name:this.Name,
      

    },process.env.JWT_SECRET,{ expiresIn: '5m' })
    
  } catch (error) {
    console.log(error);
  }
}
export default mongoose.model("USERS",UserSchema);