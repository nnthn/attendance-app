import React, { useState, useEffect } from 'react';

const TestDataTable = ({ studentId }) => {
    const [testData, setTestData] = useState({ test1: [], test2: [] });

    useEffect(() => {
        const fetchTestData = async () => {
            try {
                const response = await fetch('http://localhost:3001/fetchTestData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studentId })
                });
                const data = await response.json();
                setTestData(data);
            } catch (error) {
                console.error('Error fetching test data:', error);
            }
        };

        fetchTestData();
    }, [studentId]);

    return (
        <div>
            <h2>Test Data</h2>
            <h3>Internal 1</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>StudentId</th>
                        <th>Subject</th>
                        <th>TotalMark</th>
                        <th>CO1</th>
                        <th>CO2</th>
                    </tr>
                </thead>
                <tbody>
                    {testData.test1.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.studentId}</td>
                            <td>{row.subject}</td>
                            <td>{row.totalMark}</td>
                            <td>{row.co1}</td>
                            <td>{row.co2}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Internal 2</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>StudentId</th>
                        <th>Subject</th>
                        <th>TotalMark</th>
                        <th>CO3</th>
                        <th>CO4</th>
                    </tr>
                </thead>
                <tbody>
                    {testData.test2.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.studentId}</td>
                            <td>{row.subject}</td>
                            <td>{row.totalMark}</td>
                            <td>{row.co3}</td>
                            <td>{row.co4}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestDataTable;
