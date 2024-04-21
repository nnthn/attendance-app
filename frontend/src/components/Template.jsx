import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import AddAcademics from './AddAcademics';
import AddNonAcademics from './AddNonAcademics';
function NextPage() {
    const firstNamestr = localStorage.getItem('firstName');
    const lastNamestr = localStorage.getItem('lastName');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
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
          <div>
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
            )}
          </div>
          <div >
             {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {studentDetails && (
                <div className="add-details">
                  <AddAcademics studentId={studentDetails[0].id} semister={studentDetails[0].semister}/>
                  <AddNonAcademics studentId={studentDetails[0].id}/>
                </div>
            )}
           
          </div>
           <Link className="siginin" to="/"><button className="siginin-body">LOG OUT</button></Link>
        </div>
    );
}

export default NextPage;
