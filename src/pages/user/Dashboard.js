import React, { useState } from 'react';
import Navbar from '../../Components/Navbar'

import Notes from './Notes';

const Dashboard = () => {


  
 
  return (
    <div>
      
      <div className="container">
      <Navbar />
        <div className="">
         <Notes/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
