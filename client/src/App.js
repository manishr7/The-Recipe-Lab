import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import { ToastContainer, toast,Bounce  } from "react-toastify";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import AllRoutes from './Components/AllRoutes';
function App() {
  
  return (
    <Router>
      <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce}
                  />
    <div className="App relative overflow-x-hidden">
      <Navbar/>
      
      <AllRoutes />
    </div>
    </Router>
  );
}

export default App;
