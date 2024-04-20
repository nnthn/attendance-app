import React, { useState } from 'react';
import StudentsList from './StudentsList';
import StudentDetails from './StudentDetails'; // Import the new component
import './students.css';

export default function Students() {
    const [selectedStudent, setSelectedStudent] = useState(null); // State to hold the selected student

    // Function to handle click on list item
    const handleListItemClick = (student) => {
        setSelectedStudent(student); // Set the selected student
    };

    return (
        <>
          <div className="studentslist-container">
            <StudentsList onItemClick={handleListItemClick} /> {/* Pass the function as a prop */}{selectedStudent && <StudentDetails student={selectedStudent} />} {/* Render the selected student details */}
          </div>
          
        </>
    );
}
