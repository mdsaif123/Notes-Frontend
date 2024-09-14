import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Category from './pages/Category';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import Pop from './pages/Pop';
import Service from './pages/Service';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './Components/Routes/PrivateRoute';
import ForgotPassword from './auth/ForgotPassword';
import AdminPrivateRoute from './Components/Routes/AdminPrivateRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';





function App() {
  return (
     <>
  
    <Router>
      <Routes>
     
        <Route path="/" element={<Login/>} />
      

        
        <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>} />
        </Route>
        
        <Route path="/dashboard" element={<AdminPrivateRoute/>}>
        <Route path="admin" element={<AdminDashboard/>} />
        </Route>
 


    
       
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/category" element={<Category />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pop />} />
      </Routes>
    </Router>
    </>
  );
 
}

export default App;
