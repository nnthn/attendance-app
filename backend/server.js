const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const mysql= require('mysql2');
const app = express();
const port= 3000;

//Configure middleware;
app.use(bodyParser.json());
app.use(cors());

//Configure MySql conncection;
const db = mysql.createConnection({
    host:'localhost',
    user:'nnthn',
    password:'nnthn',
    database:'attendancedb',
});

db.connect((err)=>{
    if(err){
	console.error("Database connection error: "+err);
    }else{
	console.log('Connected to MySql');
    }

});

//admin
//Create API route for attendance management
app.post('/addStudent',(req,res)=>{
    //implement code to add a new student to the database
    const  {firstName,lastName,branch} =req.body;

    if(!firstName || !lastName || !branch){
	return res.status(400).json({error: 'All fields are required'});
    }

    const query ='INSERT INTO students (firstName,lastName,branch) VALUES (?,?,?)';
    db.query(query,[firstName, lastName, branch],(err,result)=>{
	if(err){
	    console.error('Error adding students: '+err);
	    return res.status(500).json({error: 'Error adding students'});
	}

	//student added successfully
	res.status(201).json({message:'Student added successfully'});
    });
});


//Add routes for searching and marking attendance
//route to retrieve a list of student for UI
app.get('/students',(req,res) =>{
    ///implement a code to retreeive and send a list of students from the database
    const query ='SELECT * FROM students';
    db.query(query,(err,results)=>{
	if(err){
	    console.error('Error while fetching students: '+err);
	    return res.status(500).json({error:'Error while fetching students'});
	}
	res.status(200).json(results);
    });
});


//route for students to mark attendance
app.post('/markAttendance', (req, res) => {
  // Implement code to mark attendance for a student on the current date
  const { studentId, present } = req.body;
  if (!studentId) {
    return res.status(400).json({ error: 'Student ID is required' });
  }
  // Get today's date
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const query = 'INSERT INTO attendance (studentId, date, present) VALUES (?, ?, ?)';
  db.query(query, [studentId, today, present], (err, result) => {
    if (err) {
      console.error('Error marking attendance: ' + err);
      return res.status(500).json({ error: 'Error marking attendance' });
    }
    res.status(201).json({ message: 'Attendance marked successfully' });
  });
});


//start the server
app.listen(port,() =>{
    console.log(`Server is runnting on port ${port}`);
});
