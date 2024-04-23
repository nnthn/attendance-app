import React, { useState, useEffect } from 'react';

function StudentAcademicsDetails({ studentId }) {
    const [academicsDetails, setAcademicsDetails] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAcademicsDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:3001/academics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ studentId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch student academics details');
                }

                const data = await response.json();
                setAcademicsDetails(data.data);
            } catch (error) {
                console.error('Error fetching student academics details:', error);
                setError('Failed to fetch student academics details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAcademicsDetails();
    }, [studentId]);
    console.table(academicsDetails[0]);
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {academicsDetails && (
                <div>
                    <h2>Student Academics Details</h2>
                    <p>Student ID: {studentId}</p>
                    <p>Total Mark: {academicsDetails[0].totalMark}</p>
                    <p>SGPA: {academicsDetails[0].sgpa}</p>
                    <p>Semester: {academicsDetails[0].semester}</p>
                    {/* Add other details if needed */}
                </div>
            )}
        </div>
    );
}

export default StudentAcademicsDetails;
