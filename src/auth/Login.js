import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { NavLink,  useNavigate, } from "react-router-dom";

import { NavLink,  useNavigate} from "react-router-dom";

import { useAuth } from "../context/authcontext";

const Login = () => {

const navigate=useNavigate()

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [auth,setauth]=useAuth()

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post("https://notes-2-bi3k.onrender.com/login",
      {email,password})
      
      if (res && res.data.success) {
        toast.success("Login Successfully");
        setauth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
      
        // Log the navigation path
        console.log("Navigating to /dashboard/user");
        navigate("/dashboard/user")
        // https://prismatic-trifle-cbeeb9.netlify.app
      } else {
        toast.error(res.data.message);
      }
      
    } catch (error) {
        console.error('Error during registration:', error);
    }
};
  
  return (
    <div>
      <Toaster />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-7-offset m-auto">
            <form action="" className="my-3 login-form" onSubmit={handleSubmit}>
              <h3 className="text-center text-dark form-heading" style={{color:"#46BABE;"}}>Login</h3>
              <div className="d-flex flex-column">
                
                <input
                  className="my-3 login-input"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="my-3 login-input"
                  type="text"
                  placeholder="Enter Your password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <div className="check-forgot">
                <div className="checkbox">
                  {/* <input type="checkbox" />
                  <p>Show password</p> */}
                </div>
                <div className="forgot-password">
                  <NavLink to="/forgot-password" style={{ textDecoration: 'none',color:"black" }}>Forgot password</NavLink>

                </div>

                </div>
                
                <button className="my-3" >Login</button>
                <div className="d-flex justify-content-center ">
                <p className="mx-2 text-dark">Don't have an account?</p>
                <NavLink to="/register" style={{ textDecoration: 'none',color:"white" }}>Create Now</NavLink>
                </div>
                

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
