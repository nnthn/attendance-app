import React, { useState } from 'react';

const MarkAttendanceForm = () => {
  const [studentId, setStudentId] = useState('');
  const [present, setPresent] = useState(false);

  const handleMarkAttendance = () => {
    // Implement logic to mark attendance in the backend API
    const data = { studentId, present };

    fetch('http://localhost:3001/markAttendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => console.log('Attendance marked successfully:', result))
      .catch((error) => console.error('Error marking attendance:', error));
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <label>
        Student ID:
        <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      </label>
      <br />
      <label>
        Present:
        <input type="checkbox" checked={present} onChange={() => setPresent(!present)} />
      </label>
      <br />
      <button onClick={handleMarkAttendance}>Mark Attendance</button>
    </div>
  );
};

export default MarkAttendanceForm;
