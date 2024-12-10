import Users from "../Models/UserSchema.js";

export const getSavedRecipes = async (req, res) => {
    const { userId } = req.params;
    console.log(userId)
  try {
    const user = await Users.findById(userId).populate("savedRecipes");

    if (!user) {
      return res.status(404).send( "User not found" );
    }

    res.status(200).send(user.savedRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).send( "Server error" );
  }
};
