import React, { useState } from 'react';

export default function AddNonAcademics(props) {
    const [formData, setFormData] = useState({
        studentId: props.studentId,
        program: '',
        organization: '',
        duration: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/addnonacademics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add non-academics details');
            }

            alert('Non-academics details added successfully');
            props.setShow(false);
            // Clear form after successful submission
            setFormData({
                studentId: props.studetnId,
                program: '',
                organization: '',
                duration: ''
            });
        } catch (error) {
            console.error('Error adding non-academics details:', error);
            alert('Failed to add non-academics details');
        }
    };

    return (
        <div>
            <h2>Add Non-Academics Details</h2>
            <form onSubmit={handleSubmit}>
                <br />
                <label>
                    Program:
                    <input
                        type="text"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Organization:
                    <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Duration:
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </label>
                <br />
              <button type="submit" >Submit</button>
            </form>
        </div>
    );
}
