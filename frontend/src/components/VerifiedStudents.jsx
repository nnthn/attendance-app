import React, { useState, useEffect } from 'react';
import './students.css';

export default function NonVerifiedStudentsList({ onItemClick }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch the non-verified student data from the server
        fetch('http://localhost:3001/nonverifiedstudents')
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error('Error while fetching:', error));
    }, []);

    return (
        <>
            <div className="studentsContainer">
                <div className="studentscard">
                    {students.map((student) => (
                        <div key={student.id} className="attendance-card" onClick={() => onItemClick(student)}>
                            

                                <h4 >
                                    {student.firstName} {student.lastName}
                                </h4>
                                <p>Branch: {student.branch}</p>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
