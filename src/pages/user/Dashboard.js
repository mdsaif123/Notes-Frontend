import React, { useState } from 'react';
import Navbar from '../../Components/Navbar'
import axios from 'axios';
import Notes from './Notes';

const Dashboard = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    images: [],
    address: '',
    time: '',
    date: '',
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    // Handle multiple image selection correctly
    setEventData({ ...eventData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(eventData).forEach((key) => {
        if (key === 'images') {
          // Append each image file to the form data
          eventData[key].forEach((image) => formData.append('images', image));
        } else {
          formData.append(key, eventData[key]);
        }
      });

      const token = "yourToken"; // Replace with the actual token
      const response = await axios.post('http://localhost:8080/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include token if needed
        },
      });

      if (response.status === 201) {
        alert('Event added successfully');
      } else {
        throw new Error('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('An unexpected error occurred while adding the event. Please try again.');
    }
  };

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
