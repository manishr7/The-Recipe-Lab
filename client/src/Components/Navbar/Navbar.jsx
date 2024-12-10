import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";

import { BiLogOut } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthLogout } from "../../Reducers/UserReducer";
import { useNavigate } from "react-router-dom";
import {  toast,Bounce  } from "react-toastify";
import Logo from "./Logo.png"
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.value);
  const [show, setshow] = useState("none");
  const [isOpen, setIsOpen] = useState(false);
  const notify = () => toast.success('Logged Out Successfully !', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition:Bounce,
    });
  const handleListShow = () => {
    console.log("clicked");
    if (show === "none") setshow("block");
    else setshow("none");
  };
  const handleLogout = () => {
    dispatch(AuthLogout());
    notify();
    navigate("/");
  };
  const handleWishlist = () => {
    console.log(user)
    if(user) navigate("/wishlist");
    else { 
      
      toast.error("Please login first to access the saved recipes!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
      navigate("/auth/login")
    }
  };
  return (
    <div>
      
      <nav className="block bg-white dark:bg-gray-900 relative sm:fixed z-50  w-full  top-0 start-0   shadow-md shadow-gray-300 dark:border-gray-600">
        <div className="max-w-screen-xl h-fit flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={Logo}
              className="h-8"
              alt="Recipe Logo"
            />
            <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
            The Recipe Lab
            </span>
          </Link>
          <div className="flex  md:order-2 relative space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <>
                <RxAvatar
                  size={38}
                  className="my-auto text-black dark:text-white hover:text-blue-500 cursor-pointer "
                  onClick={() => handleListShow()}
                />

                <div
                  style={{ display: `${show}` }}
                  className="w-48 absolute top-[170%] right-[-1rem] text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <button
                    type="button"
                    className="relative inline-flex items-center w-full px-4 py-2 text-md font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:z-10 focus:ring-2 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                  >
                    <svg
                      className="w-4 h-4 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    {user.name}
                  </button>
                  
                  <Link to={"/wishlist"} 
                    type="button"
                    className="relative inline-flex items-center w-full px-4 py-2 text-md font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:z-10 focus:ring-2  dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                  >
                    <FaRegHeart className="me-2.5" size={16} />
                    Saved Recipes
                  </Link>
                  <hr />
                  <button
                    onClick={() => handleLogout()}
                    type="button"
                    className="relative inline-flex items-center w-full mt-3 px-4 py-2 text-md font-medium rounded-b-lg  hover:text-blue-700 focus:text-blue-700   dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                  >
                    <BiLogOut size={18} className="me-2.5" />
                    Logout
                  </button>
                  
                </div>
              </>
            ) : (
              <Link to={"/auth/login"}>

                <button
                  
                  type="button"
                  className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500  font-medium rounded-lg  py-1.5 px-3 text-md text-center me-2 my-auto dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
                </Link>
              
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-md text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
          isOpen ? '' : 'hidden'
        }  w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-300 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  className="block relative py-2 px-3 text-xl active:text-blue-500 text-black bg-transparent before:absolute before:top-[100%] before:left-0 before:h-1 before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:before:w-full "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              
              <li>
                <p

                  onClick={handleWishlist}
                  className="flex relative cursor-pointer  py-2 px-3 text-xl active:text-blue-500  text-black bg-transparent before:absolute before:top-[100%] before:left-0 before:h-1 before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:before:w-full"
                >
                  Wishlist
                  <FaRegHeart className="ml-2 my-auto" size={18} />
                </p>
              </li>
              <li>
                <Link
                  to={"/recipes"}
                  className="flex relative  py-2 px-3 text-xl active:text-blue-500 text-black bg-transparent before:absolute before:top-[100%] before:left-0 before:h-1 before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:before:w-full"
                >
                  Recipes
                  <BiFoodMenu className="ml-2 my-auto" size={20}/>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
