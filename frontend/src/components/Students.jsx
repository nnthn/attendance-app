import React, { useState, useEffect } from 'react';
import StudentsList from './StudentsList';
import StudentDetails from './StudentDetails'; // Import the new component
import {Link} from 'react-router-dom';
import Verified from "./VerifiedStudents.jsx";
import AddStudent from './Addstudents.jsx';
import './students.css';
import StudentAcademicDetails from './StudentAcademicDetails.jsx';
import StudentNonAcademics from './StudentNonAcademics.jsx';


export default function Students() {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [student,setStudent] =useState('');
    const [newStudent, setNewStudent] = useState(true);
    const handleListItemClick = (student) => {
        setSelectedStudent(student);
        setNewStudent(false);  
    };
    const handleStudentButton=()=>{
        setNewStudent(!newStudent);  
    };
    const onStudentClick =(student)=>{
        setStudent(student);
    };
    return (
        <>
          <div className="admin-pannel">
            <div className="div1">
              <div className="admin-info">
                <div className="all-students">
                  <div>
                    <h3 className="sub-heading">Students</h3>
                  </div>
                  <div>
                    <button onClick={handleStudentButton}>AddStudent</button>
                  </div>
                </div>
                <Verified onItemClick={onStudentClick}/>
              </div>
              <div className="info-diagram">
                <StudentDetails student={student} />
              </div>
            </div>
            <div className="div2">
              <div>
                  <h2 className="sub-heading">Unverified Students</h2>
                <div className="students-list"> 
                  <StudentsList onItemClick={handleListItemClick} />
                </div>
              </div>

              {!newStudent ? selectedStudent 
               && <div>
                    <StudentAcademicDetails studentId={selectedStudent.id}/>
                    <StudentNonAcademics studentId={selectedStudent.id}/>
                  </div>:<AddStudent/>} 
            </div>
          </div>
        </>
    );
}
