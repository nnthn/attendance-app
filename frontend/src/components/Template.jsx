import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import AddAcademics from './AddAcademics';
import AddNonAcademics from './AddNonAcademics';
import TestDataTable from './TestDataTable.jsx';
function NextPage() {
    const firstNamestr = localStorage.getItem('firstName');
    const lastNamestr = localStorage.getItem('lastName');
    const [showForm,setShowForm] = useState(false);
    const [academics,setAcademics] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentDetails, setStudentDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let firstNamel = '';
        let lastNamel = '';
        try {
            firstNamel = JSON.parse(firstNamestr);
            lastNamel = JSON.parse(lastNamestr);
        } catch (error) {
            console.error('Error parsing user details:', error);
        }
        setFirstName(firstNamel);
        setLastName(lastNamel);
    }, [firstNamestr, lastNamestr]);

    useEffect(() => {
        if (firstName && lastName) {
            handleSubmit();
        }
    }, [firstName, lastName]);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3001/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch student details');
            }

            const data = await response.json();
            setStudentDetails(data);
        } catch (error) {
            console.error('Error fetching student details:', error);
            setError('Failed to fetch student details');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="student-login">
          <div className="std-ip">
            <div className="std-container">
              {isLoading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {studentDetails && (
                  <div>
                    <h3>Student Details:</h3>
                    <div key={studentDetails[0].id}>
                      <p>Name :{studentDetails[0].firstName} {studentDetails[0].lastName}</p>
                      <p>Email : {studentDetails[0].email}</p>
                      <p>Branch : {studentDetails[0].branch}</p>
                      <p>Semister : S{studentDetails[0].semister}</p>
                      <p>PhoneNumber : {studentDetails[0].phoneNumber}</p>
                      <p>Address : {studentDetails[0].address}</p>
                    </div>
                    
                  </div>
              )} <div className="button-container">
                      <button style={{width:'fit-content' ,padding:'1rem',margin:"1rem"}} onClick={()=>{setAcademics(true);setShowForm(!showForm);}}>Add Academic Details</button>
                      <button style={{width:'fit-content' ,padding:'1rem',margin:"1rem"}} onClick={()=>{setAcademics(false);setShowForm(!showForm);}}>Add NonAcademic Details</button>
                    </div>
            </div>
            
            <div >
              
              {isLoading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {studentDetails && showForm && (
                  <div className="add-details">
                    {academics? <AddAcademics studentId={studentDetails[0].id} semister={studentDetails[0].semister} setShow={setShowForm}/>: <AddNonAcademics setShow={setShowForm} studentId={studentDetails[0].id}/>}

                  </div>
              )}
              
            </div>
            <Link className="siginin" to="/"><button className="siginin-body">LOG OUT</button></Link>
          </div>
          <div>

            {studentDetails&&<TestDataTable studentId={studentDetails[0].id}/>}
          </div>
        </div>
    );
}

export default NextPage;
