import React, { useState } from 'react';

function AddAcademics(props) {
    
    const [formData, setFormData] = useState({
        studentId: props.studentId,
        totalMark: '',
        sgpa: '',
        semester: props.semister
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
            // Clear form after successful submission
            setFormData({
                studentId: props.studentId,
                totalMark: '',
                sgpa: '',
                semester: props.semister
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
                
                <br />
                <label>
                    Total Mark:
                    <input
                        type="text"
                        name="totalMark"
                        value={formData.totalMark}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    SGPA:
                    <input
                        type="text"
                        name="sgpa"
                        value={formData.sgpa}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddAcademics;
