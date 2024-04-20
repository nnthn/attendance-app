import React, { useState } from 'react';

export default function StudentDetails({ student }) {
    const [marksData1, setMarksData1] = useState({
        subject: '',
        totalMark: '',
        co1: '',
        co2: '',
    });

    const [marksData2, setMarksData2] = useState({
        subject: '',
        totalMark: '',
        co3: '',
        co4: '',
    });

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setMarksData1((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setMarksData2((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();
        const { subject, totalMark, co1, co2 } = marksData1;
        const data = {
            studentId: student.id,
            subject,
            totalMark,
            co1,
            co2,
        };

        fetch('http://localhost:3001/addmarks1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Marks added successfully to addmarks1:', result);
                // Add any logic to handle successful submission
            })
            .catch((error) => console.error('Error adding marks to addmarks1:', error));
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        const { subject, totalMark, co3, co4 } = marksData2;
        const data = {
            studentId: student.id,
            subject,
            totalMark,
            co3,
            co4,
        };

        fetch('http://localhost:3001/addmarks2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Marks added successfully to addmarks2:', result);
                // Add any logic to handle successful submission
            })
            .catch((error) => console.error('Error adding marks to addmarks2:', error));
    };

    return (
        <div>
            <h2>Selected Student Details</h2>
            <p>Name: {student.firstName} {student.lastName}</p>
            <p>Branch: {student.branch}</p>
            <div>
                <h3>Add Marks to addmarks1</h3>
                <form onSubmit={handleSubmit1}>
                    <label>
                        Subject:
                        <input type="text" name="subject" value={marksData1.subject} onChange={handleChange1} />
                    </label>
                    <label>
                        Total Mark:
                        <input type="number" name="totalMark" value={marksData1.totalMark} onChange={handleChange1} />
                    </label>
                    <label>
                        CO1:
                        <input type="number" name="co1" value={marksData1.co1} onChange={handleChange1} />
                    </label>
                    <label>
                        CO2:
                        <input type="number" name="co2" value={marksData1.co2} onChange={handleChange1} />
                    </label>
                    <button type="submit">Add Marks to addmarks1</button>
                </form>
            </div>
            <div>
                <h3>Add Marks to addmarks2</h3>
                <form onSubmit={handleSubmit2}>
                    <label>
                        Subject:
                        <input type="text" name="subject" value={marksData2.subject} onChange={handleChange2} />
                    </label>
                    <label>
                        Total Mark:
                        <input type="number" name="totalMark" value={marksData2.totalMark} onChange={handleChange2} />
                    </label>
                    <label>
                        CO3:
                        <input type="number" name="co3" value={marksData2.co3} onChange={handleChange2} />
                    </label>
                    <label>
                        CO4:
                        <input type="number" name="co4" value={marksData2.co4} onChange={handleChange2} />
                    </label>
                    <button type="submit">Add Marks to addmarks2</button>
                </form>
            </div>
        </div>
    );
}
