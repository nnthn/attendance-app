import React,{useState,useEffect} from 'react';

export default function Students(){
    const [students, setStudents] = useState([]);
    //use useEffect() to fetch data
    useEffect(()=>{
        //fetch the student from the server
        fetch('http://localhost:3001/students')
            .then((response)=>response.json())
            .then((data)=>setStudents(data.map((student)=>({
                ...student,
                present:false,
            }))))
            .catch((error)=>console.error('Error while fetcheing',error));
        
    },[]);
    
    
    const  handleCheckboxChange =(id)=>{
        setStudents((prevStudents)=>
            prevStudents.map((student)=>
                student.id === id?{...student, present: !student.present}: student
            )
        );
    };
    
    const handleAttendance = (studentId,present) => {
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
        <div className="studentscontainer">
          { students.map((student)=>(
              <div key={student.id} className="attendance-card">
                <h3>{student.firstName} {student.lastName}</h3>
                <p>Branch: {student.branch}</p>
                <label>
                  <input
                    type="checkbox"
                    checked={student.present}
                    onChange={()=>handleCheckboxChange(student.id)}
                  />{' '}
                  present
                </label>
                <button  onClick={()=>handleAttendance(student.id,student.present)}>Submit</button>
              </div>  
          ))}
          
        </div>
    );
}
