import React from "react";
import Image from "./Banner2.jpg";

function Banner() {
  return (
    <>
    <div className=" h-96 w-full  mt-32 md:h-svh">
      <div
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
        }}
       
      >
        <div className="py-10 px-8 md:py-20 md:px-8">
          <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Better Data,
            </span>{" "}
           <span className="text-white"> Smarter Recipes!</span>
          </h1>
          <p class="text-lg pr-12 md:pr-72  text-white lg:text-2xl font-semibold lg:tracking-wider" >
            At The Recipe Lab, we combine the art of cooking with the power of
            innovation to transform how you discover and create recipes. By
            leveraging technology and creativity, we unlock new flavors and
            ideas, making every meal an experience worth savoring.
          </p>
        </div>
      </div>
      </div>
    </>
  );
}

export default Banner;
