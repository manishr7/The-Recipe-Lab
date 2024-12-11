import React from "react";
import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { AuthLogin } from "../../Reducers/UserReducer";
import axios from "axios";
import { toast,Bounce  } from "react-toastify";
function Signin() {
  const navigate = useNavigate();
  const user=useSelector((state)=> state.Auth.value);
 
  const dispatch=useDispatch();
  

  const [loading, setloading] = useState(false)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  console.log(email,password);
  const handleLogin=async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      
      const response=await axios.post('https://the-recipe-lab-production.up.railway.app/api/auth/login', {
        email: email,
        password: password,
      })
      console.log(response.data);
      if(response) dispatch(AuthLogin(response.data));
      toast.success('User Logged In Successfully !', {
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
        navigate("/");
      
    } catch (error) {
      console.log("inside catch")
      toast.error(error.response.data, {
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
    }
    finally{
    setloading(false)
    }
    
  }
  return (
    <section className="bg-transparent dark:bg-gray-900 mt-32">
      
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p className="size-12 rounded-full flex items-center justify-center bg-blue-600">
          <MdLock size={28} className="text-white"/>
          </p>
          <h2 className="text-2xl  my-1">Sign in</h2>
        
        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={(e)=>handleLogin(e)} className="space-y-4 md:space-y-6" action="#">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e)=>setemail(e.target.value)}
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e)=>setpassword(e.target.value)}
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_password"
                  className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-400  rounded bg-gray-50 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                
              </div>
              <button
                
                disabled={loading}
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <div className="flex justify-between">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/auth/register"}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
                
              </p>
              {
                loading?
              (<Spinner/>):null
              }
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
