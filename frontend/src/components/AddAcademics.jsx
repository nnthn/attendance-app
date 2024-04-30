import React, { useState } from 'react';

function AddAcademics(props) {
    
    const [formData, setFormData] = useState({
        studentId: props.studentId,
        grade: '',
        subject: '',
        semester: props.semister
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('here to submit');
        try {
            const response = await fetch('http://localhost:3001/addacademics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add academics details');
            }

            alert('Academics details added successfully');
            props.setShow(false);
            setFormData({
                studentId: props.studentId,
                grade: '',
                subject: '',
                semester:'',
            });
        } catch (error) {
            console.error('Error adding academics details:', error);
            alert('Failed to add academics details');
        }
    };

    return (
        <div className="academic-container">
            <h2>Add Academics Details</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Semester :
                    <select name="semester" value={formData.semester} onChange={handleChange}>
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
                <br />
                <label>
                    Grade :
                    <input
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                    />
                </label>
              <br />
               <label>
                    Subject :
                    <select name="subject" value={formData.subject} onChange={handleChange}>
                      <option value="">Select Subject</option>
                      <option value="Compiler Design">Compiler Design</option>
                      <option value="Computer Graphics">Computer Graphics</option>
                      <option value="AAD">AAD</option>
                      <option value="IEFT">IEFT</option>
                      <option value="Python">Python</option>
                      <option value="Data Communications">Data Communications</option>
                    </select>
               </label>
                <br />
                <br />
              <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddAcademics;
