import React, { useState, useEffect } from 'react';
import StudentsList from './StudentsList';
import StudentDetails from './StudentDetails'; // Import the new component
import {Link} from 'react-router-dom';
import Verified from "./VerifiedStudents.jsx";
import AddStudent from './Addstudents.jsx';
import './students.css';
import StudentAcademicDetails from './StudentAcademicDetails.jsx';
import StudentNonAcademics from './StudentNonAcademics.jsx';
import PieChartComponent from "./PiechartComponent.jsx";

export default function Students() {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [student,setStudent] =useState('');
    const [newStudent, setNewStudent] = useState(false);
    const [showChart,setShowChart] =useState(true);
    const [sem, setSem] = useState({
        semester: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSem({ ...sem, [name]: value });
        console.log(sem.semester);
    };
    const handleListItemClick = (student) => {
        setSelectedStudent(student);
        setNewStudent(false);  
    };
    const handleStudentButton=()=>{
        setNewStudent(!newStudent);  
    };
    const onStudentClick =(student)=>{
        setStudent(student);
        setShowChart(!showChart);
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
                <label>
                    Semester :
                  <select name="semester" value={sem.semester} onChange={handleChange}>
                      <option value="">Select Semester</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
               </label>
                <Verified onItemClick={onStudentClick} sem={sem.semester}/>
              </div>
              <div className="info-diagram">
                <h2>Analytics</h2>
                { showChart ?<PieChartComponent/>:
                <StudentDetails student={student} />}
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
              <Link className="logout" to="/"><button className="siginin-body">LOG OUT</button></Link>
            </div>
            
          </div>
          
        </>
    );
}
