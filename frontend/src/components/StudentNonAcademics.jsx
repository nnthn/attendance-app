import React, { useState, useEffect } from 'react';

function StudentNonAcademicsDetails(props) {
    const [nonAcademicsDetails, setNonAcademicsDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch student non-academics details by studentId
        const fetchNonAcademicsDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:3001/nonacademics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ studentId: props.studentId }), // Pass the studentId received from props
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch student non-academics details');
                }

                const data = await response.json();
                setNonAcademicsDetails(data.data); // Extracting the data array from the response
            } catch (error) {
                console.error('Error fetching student non-academics details:', error);
                setError('Failed to fetch student non-academics details');
            } finally {
                setIsLoading(false);
            }
        };

        // Call the function to fetch student non-academics details when the component mounts
        fetchNonAcademicsDetails();
    }, [props.studentId]); // Trigger fetchNonAcademicsDetails whenever the studentId changes

    return (
        <div>
            <h2>Student Non-Academics Details</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {nonAcademicsDetails && (
                <div>
                    <p>Program: {nonAcademicsDetails[0].program}</p>
                    <p>Organization: {nonAcademicsDetails[0].organization}</p>
                    <p>Duration: {nonAcademicsDetails[0].duration}</p>
                </div>
            )}
        </div>
    );
}

export default StudentNonAcademicsDetails;
