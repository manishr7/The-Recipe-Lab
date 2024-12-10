import React from "react";
import mainCourse from "../../Images/mainCourse.jpg"
import Dessert from "../../Images/Dessert.jpg"
import Salad from "../../Images/Salad.jpg"
import Drink from "../../Images/Drink.jpg"
import Snack from "../../Images/Snack.jpg"
import Breakfast from "../../Images/Breakfast.jpg"
import { Link } from "react-router-dom";
import "./Cards.css"
function Cards() {
  return (
    <div className="h-fit w-full gap-10 flex  flex-wrap justify-center  my-16 px-10">
    <Link
      to={"/recipes/mainCourse"}
      className="block relative pro Main transition-all duration-500 hover:scale-105 max-w-sm h-80 rounded-xl shadow-black shadow-md  "
    >
      <img className="   h-full w-full rounded-xl" src={mainCourse} alt="" />
    </Link>
    <Link
      to={"/recipes/dessert"}
      className="block relative pro Dessert transition-all duration-500 hover:scale-105 max-w-sm h-80 rounded-xl shadow-black shadow-lg  "
    >
      <img className="h-full w-full rounded-xl" src={Dessert} alt="" />
    </Link>
    <Link
      to={"/recipes/salad"}
      className="block relative pro Salad transition-all duration-500 hover:scale-105 max-w-sm h-80 rounded-xl shadow-black shadow-lg  "
    >
      <img className="h-full w-full rounded-xl" src={Salad} alt="" />
    </Link>
    <Link
      to={"/recipes/breakfast"}
      className="block relative pro Breakfast transition-all duration-500 hover:scale-105 max-w-sm h-80 rounded-xl shadow-black shadow-lg  "
    >
      <img className="h-full w-full rounded-xl" src={Breakfast} alt="" />
    </Link>
    <Link
      to={"/recipes/snack"}
      className="block relative pro Snack transition-all duration-500 hover:scale-105 max-w-sm h-80 rounded-xl shadow-black shadow-lg  "
    >
      <img className="h-full w-full rounded-xl" src={Snack} alt="" />
    </Link>
    <Link
      to={"/recipes/drink"}
      className="block relative pro Drink transition-all duration-500 hover:scale-105 max-w-sm h-80 rounded-xl shadow-black shadow-lg  "
    >
      <img className="h-full w-full rounded-xl" src={Drink} alt="" />
    </Link>
    </div>
  );
}

export default Cards;
