import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";


const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setanswer] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post("https://notes-2-bi3k.onrender.com/register",
      {name,email,phone,password,answer})
      if(res && res.data.success){
          toast.success(res.data.message)
          navigate("/login")

        
        }else{
          toast.error(res.data.message)
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
            <form action="" className="my-3 register-from" onSubmit={handleSubmit}>
              <h3 className="text-center text-dark form-heading">Register</h3>
              <div className="d-flex flex-column">
                <input
                  className="my-3 register-input"
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
                <input
                  className="my-3 register-input"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="my-3 register-input"
                  type="text"
                  placeholder="Enter Your password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <input
                  className="my-3 register-input"
                  type="text"
                  placeholder="Enter Your phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
                <input
                  className="my-3 register-input"
                  type="text"
                  placeholder="Enter Your address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
                <input
                  className="my-3 register-input"
                  type="text"
                  placeholder="Enter Your fav sports"
                  value={answer}
                  onChange={(e) => setanswer(e.target.value)}
                />

                <button>Register</button>
                <div className="d-flex justify-content-center ">
                <p className="mx-2 text-dark">already an account?</p>
                <NavLink to="/login" style={{ textDecoration: 'none',color:"white" }}>Login here</NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
