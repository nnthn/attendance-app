import React, { useState, useEffect } from 'react';
import './students.css';

export default function NonVerifiedStudentsList({ onItemClick,sem }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch the non-verified student data from the server
        fetch('http://localhost:3001/nonverifiedstudents')
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error('Error while fetching:', error));
    }, []);
    console.log("here");
    console.log(sem);
    return (
        <>
            <div className="studentsContainer">
                <div className="studentscard">
                  {students.map((student) => (
                      
                        student.semister == sem ?                         <div key={student.id} className="attendance-card" onClick={() => onItemClick(student)}>
                          <h4 >
                            {student.firstName} {student.lastName}
                          </h4>
                          <p>Semester: S{student.semister}</p>

                                                                           </div>:<h4></h4>
                    ))}
                </div>
            </div>
        </>
    );
}
