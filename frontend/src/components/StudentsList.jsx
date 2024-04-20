import React, { useState, useEffect } from 'react';
import './students.css';

export default function StudentsList({ onItemClick }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch the student data from the server
        fetch('http://localhost:3001/students')
            .then((response) => response.json())
            .then((data) =>
                setStudents(
                    data.map((student) => ({
                        ...student,
                        present: false,
                    }))
                )
            )
            .catch((error) => console.error('Error while fetching:', error));
    }, []);

    const handleCheckboxChange = (id) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === id ? { ...student, present: !student.present } : student
            )
        );
    };

    const handleAttendance = (studentId, present) => {
        // Logic to mark attendance
    };

    return (
        <>
            <div className="studentsContainer">
                <div className="studentscard">
                    {students.map((student) => (
                        <div>
<div className="form1">
                          <div key={student.id} className="attendance-card" onClick={() => onItemClick(student)}> {/* Call onItemClick */}
                            <div className="text">
                              <h3>
                                {student.firstName} {student.lastName}
                              </h3>
                            </div>
                            <div className="markattendance">
                              <p>Branch: {student.branch}</p>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={student.present}
                                  onChange={() => handleCheckboxChange(student.id)}
                                />{' '}
                                verified
                              </label>
                              <button onClick={() => handleAttendance(student.id, student.present)}>Submit</button>
                            </div>
                          </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
