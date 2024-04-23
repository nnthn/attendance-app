import React, { useState } from 'react';
import StudentsList from './StudentsList';
import StudentDetails from './StudentDetails'; // Import the new component
import {Link} from 'react-router-dom';
import Verified from "./VerifiedStudents.jsx";
import AddStudent from './Addstudents.jsx';
import './students.css';


export default function Students() {
    const [selectedStudent, setSelectedStudent] = useState(null); // State to hold the selected student
    const [newStudent, setNewStudent] = useState(true);

    // Function to handle click on list item
    const handleListItemClick = (student) => {
        setSelectedStudent(student);
        setNewStudent(!newStudent);// Set the selected student
    };
    
    return (
        <>
          <div className="studentslist-container">
            <div>
              <StudentsList onItemClick={handleListItemClick} />
              <h5>Verified Students</h5>
              <div className="logout-container">
                <Verified/>
                <Link className="siginin" to="/"><button className="siginin-body">LOG OUT</button></Link>
              </div>
            </div>
            {newStudent ? selectedStudent && <StudentDetails student={selectedStudent} />:<AddStudent/>} 
          </div>
          
        </>
    );
}
