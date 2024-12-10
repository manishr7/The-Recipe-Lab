import React from "react";
import { useState ,useRef} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import axios from "axios";
import { toast,Bounce  } from "react-toastify";
function Signup() {
  const navigate = useNavigate();
  const submitButton = useRef(null)
  const [loading, setloading] = useState(false)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  console.log(email,password,name);
  const handlesignup=async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      submitButton.current.disabled= true
      const response=await axios.post('http://localhost:8000/api/auth/register', {
        name:name,
        email: email,
        password: password,
      })
      
      toast.success('User Created Successfully !', {
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
        navigate("/auth/login");
      
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
    
    setloading(false)
    submitButton.current.disabled= false
    
  }
  return (
    <section className="bg-transparent dark:bg-gray-900 mt-32">
      
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p className="size-12 rounded-full flex items-center justify-center bg-blue-600">
          <MdLock size={28} className="text-white"/>
          </p>
          <h2 className="text-2xl  my-1">Sign Up</h2>
        
        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={(e)=>handlesignup(e)} className="space-y-4 md:space-y-6" action="#">
            <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={(e)=>setname(e.target.value)}
                  type="text"
                  name="floating_name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_name"
                  className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Name
                </label>
              </div>
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
              
              <button
                ref={submitButton}
                
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
              <div className="flex justify-between">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/auth/login"}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign in
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

export default Signup;
