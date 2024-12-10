import Users from "../Models/UserSchema.js";
import bcrypt from "bcryptjs"

export const login = async (req, res) => {
    try {
      const{email,password}=req.body;
      const response = await Users.findOne({Email:email});
      if (!response) {
        return res.status(400).send("Invalid Credentials");
      }
      const isPasswordValid = await bcrypt.compare(password, response.Password);
      if(isPasswordValid)
        { 
          res.status(200).json({  
            msg:"Login Successfull...",
            token:response.generateToken(),
            email:response.Email,
            name:response.Name,
            id:response._id,
          });
        }
      else res.status(401).send("Invalid Email or Password !")
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error" });
    }
  };