import mongoose from 'mongoose';

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  readyInMinutes: {
    type: Number,
  },
  image: {
    type: String,
  },
  summary: {
    type: String,
  },
  dishTypes: {
    type: [String],
  },
  healthScore: {
    type: Number,
  },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

export default Recipe;
