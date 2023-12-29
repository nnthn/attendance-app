import React,{useState} from 'react';
import "./signin.css";

export default function Signin(){
    const [inputValues, setInputVal] =useState({
        username:'',
        password:'',
    });
    const handleInputChange=(event)=>{
        const {name,value}=event.target;
        setInputVal((prev)=>({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: inputValues.username, password: inputValues.password }),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
            } else {
                console.error('Form submission failed.');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
        
    };
    
    return (
        <div className="Signincontainer">
          <div className="Siginin">
            <div className="text">
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
              <button className="outline secondary" disabled>LOG IN</button>
              <button onClick={handleSubmit}>SIGN IN</button>
            </div>
          </div>
        </div>
    );
}
