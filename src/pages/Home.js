import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { useAuth } from '../context/authcontext'


const Home = () => {

  const [auth,setauth]=useAuth()
  return (
   <>
    <Navbar/>
    <div className="container">
        <h1>home</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
    </div>
 
   </>
  )
}

export default Home
