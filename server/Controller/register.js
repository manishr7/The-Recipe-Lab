import Users from "../Models/UserSchema.js";
export const register= async (req, res) => {
    try {
      const{email,password,name}=req.body;
      const response = await Users.findOne({Email:email});
      if(response) res.status(409).send("user already exists");
      else 
      {
        const user=new Users({Name:name,Email:email,Password:password});
        const response=await user.save();
        if(response) res.status(201).send({
          msg:"User created Successfully..."
        }
        );
        
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Server error" });
    }
  };