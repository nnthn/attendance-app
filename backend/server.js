const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const mysql= require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port= 3000;
require('dotenv').config();
app.use(express.json());
//Configure middleware;
app.use(bodyParser.json());
app.use(cors());

//Configure MySql conncection;
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit: 0
});



//connection management
db.on('error',function(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
	alert("connection not done");
    }else{
	throw err;
    }
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
    console.log(req.body);

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
 // today's date
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


// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Store username and hashedPassword in database
    // ...
    const query = 'INSERT INTO users(userName,password) VALUES(?,?)';
    db.query(query,[username,password], (err,result)=>{
	if(err){
	    console.error('Error adding user:',err);
	    return res.status(500).json({error: 'Error creating user'});
	}
    });

  res.status(201).send('User created successfully');
});

// Login Endpoint
app.post('/login', async (req, res) => {
   
  const { username, password } = req.body;
  
  // Retrieve user from database
    const query='SELECT * FROM users WHERE userName=?';
    db.query(query,[username], async (err,result)=>{
	console.log("result ",result.length);
	if(err){
	    console.err('Error retrieving user:',err);
	    return res.status(500).json({error:'Error retrieving the user:'});
	   
	}
	if(result.length===0){
	    return res.status(401).json({error:'Invalid credentials:'});
	}
	

    const user= result[0];
  // Check if user exists and password is correct
 // const validPassword = await bcrypt.compare(password, user.password);
  
	if (user.password!=password) return res.status(401).send('Invalid credentials: password wronng');

  // Create token
	const token = jwt.sign(
   { userId: user.id }, // Payload
    process.env.JWT_SECRET_KEY, // Secret key from .env file
    { expiresIn: '24h' } // Token expiration time
  );

	res.json({ accessToken: token });
	
    });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// A protected route example 
app.get('/protected-route', authenticateToken, (req,res)=>{
    res.send(`Welcome! You're authenticated.`);
});

//start the server
app.listen(port,() =>{
    console.log(`Server is runnting on port ${port}`);
});
