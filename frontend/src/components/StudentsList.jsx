import React, { useState, useEffect } from 'react';
import './students.css';

export default function StudentsList({ onItemClick }) {
    const [students, setStudents] = useState([]);
    const [updated,setUpdated]=useState(false);
    useEffect(() => {
        // Fetch the student data from the server
        fetch('http://localhost:3001/verifiedstudents')
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
    }, [updated]);

    const handleCheckboxChange = (id) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === id ? { ...student, present: !student.present } : student
            )
        );

    };

    const handleAttendance = (studentId, present) => {
        // Send a POST request to update verification status
        fetch('http://localhost:3001/verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId: studentId,
                verified: present,
            }),
        })
            .then((response) => response.json())
            .then((result) => console.log('Verification status updated successfully:', result) )
        
            .catch((error) => console.error('Error updating verification status:', error));
        
    };

    return (
        <>
            <div className="studentsContainer">
                <div className="studentscard">
                    {students.map((student) => (
                        <div key={student.id} className="attendance-card" onClick={() => onItemClick(student)}> {/* Call onItemClick */}
                            <div className="text">
                              <h3>
                                {student.firstName} {student.lastName}
                              </h3>
                            </div>
                            <div className="markattendance">
                              <p>Semester : S{student.semister}</p>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={student.present}
                                  onChange={() =>{ handleCheckboxChange(student.id);}}
                                />{' '}
                                verified
                              </label>
                              <button onClick={() =>{setUpdated(!updated); handleAttendance(student.id, student.present);setUpdated(!updated);}}>Submit</button>
                            </div>
                          </div>
                     ))}
                </div>
            </div>
          
        </>
    );
}
