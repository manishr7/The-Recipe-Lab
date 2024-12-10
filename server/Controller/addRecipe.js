import Users from "../Models/UserSchema.js";
import Recipe from "../Models/recipesSchema.js";

export const addRecipes = async (req, res) => {
  const { userId, id, title, readyInMinutes, image, summary, dishTypes, healthScore } = req.body;

  try {
    
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    
    const existingRecipe = await Recipe.findOne({ id });
    if (existingRecipe && user.savedRecipes.includes(existingRecipe._id)) {
      return res.status(400).send("Recipe already saved");
    }

   
    let savedRecipe;
    if (!existingRecipe) {
      const newRecipe = new Recipe({
        id,
        title,
        readyInMinutes,
        image,
        summary,
        dishTypes,
        healthScore,
      });

      savedRecipe = await newRecipe.save();
    } else {
      savedRecipe = existingRecipe; 
    }

   
    user.savedRecipes.push(savedRecipe._id);
    await user.save();

    res.status(200).send("Recipe added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error" );
  }
};
