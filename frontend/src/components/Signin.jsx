import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from './utils'; // Import the decodeJwt function
import Template from './Template'; // Import the Template component

import "./signin.css";

export default function Signin() {

    const [inputValues, setInputVal] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputVal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: inputValues.username, password: inputValues.password }),
            });

            if (response.ok) {
                const { accessToken, firstName,lastName } = await response.json(); // Extract accessToken and userDetails
                console.log(firstName,lastName);
                // Store accessToken in localStorage
                localStorage.setItem('accessToken', accessToken);

                // Store userDetails in localStorage
                localStorage.setItem('firstName', JSON.stringify(firstName));
                localStorage.setItem('lastName', JSON.stringify(lastName));

                const decodedToken = decodeJwt(accessToken); // Decode JWT token
                if (decodedToken.adminRole === 1) {
                    // Redirect to Students.jsx if admin role is 1
                    navigate('/students');
                } else {
                    // Redirect to Template.jsx and pass props
                    
                    navigate('/template'); 
                }
            } else {
                console.error('Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="Signincontainer">
            <div className="Siginin">
                <div className="textcontainer">
                    <h2>SRAAS</h2>
                    <input
                        type="text"
                        placeholder="UserName"
                        aria-label="Text"
                        name="username"
                        value={inputValues.username}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        name="password"
                        value={inputValues.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="buttons">
                  <button onClick={handleSubmit}>LOG IN</button>
                </div>
            </div>
        </div>
    );
}
