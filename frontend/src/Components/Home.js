import React from 'react'
import {useState} from "react"
import { Link } from 'react-router-dom'
import "./Home.css"
import Form from './Form'

const Home = () => {
  const [isComplaintModalOpen, setComplaintModalOpen] = useState(false);

  const toggleComplaintModal = () => {
    setComplaintModalOpen(!isComplaintModalOpen);
  };
  return (
    <>
    <center>
    <h2>Hello User</h2>
    </center>
    
    <div className="navbar">
  <div className="navbar-title">User Dashboard</div>
  <div className="navbar-right">
    <div className="btn btn-primary mx-1" onClick={toggleComplaintModal}>Register Complaint</div>
    <Link className="btn btn-primary mx-1" to="/login">Log Out</Link>
  </div>
</div>
<Form
        isOpen={isComplaintModalOpen}
        toggleModal={toggleComplaintModal}
      />
    </>
  )
}

export default Home