const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const path =require('path');
const app = express();
const port = 3001;
require('dotenv').config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

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

// API endpoint to fetch data from test1 and test2 based on studentId
app.post('/fetchTestData', (req, res) => {
    const { studentId } = req.body;

    // Fetch data from test1
    db.query('SELECT * FROM test1 WHERE studentId = ?', [studentId], (err, test1Data) => {
        if (err) {
            console.error('Error fetching data from test1:', err);
            res.status(500).json({ error: 'Error fetching data from test1' });
            return;
        }

        // Fetch data from test2
        db.query('SELECT * FROM test2 WHERE studentId = ?', [studentId], (err, test2Data) => {
            if (err) {
                console.error('Error fetching data from test2:', err);
                res.status(500).json({ error: 'Error fetching data from test2' });
                return;
            }

            // Combine test1 and test2 data
            const testData = {
                test1: test1Data,
                test2: test2Data
            };

            // Send the combined data as the response
            res.json(testData);
        });
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

// Route to fetch user details
app.get('/user/details', authenticateToken, (req, res) => {
    const { userId } = req.user;
    const query = 'SELECT username, password FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error retrieving user details:', err);
            return res.status(500).json({ error: 'Error retrieving user details' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { username, password } = result[0];
        res.json({ username, password });
    });
});

//admin
//Create API route for attendance management
app.post('/addStudent', async (req, res) => {
    // Extract student details from request body
    const { firstName, lastName, branch, email, semister, phoneNumber, address } = req.body;
    // Validate request body
    if (!firstName || !lastName || !branch) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert student into students table
        const insertStudentQuery = 'INSERT INTO students (firstName, lastName, branch, email, semister, phoneNumber, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const studentResult = await db.promise().query(insertStudentQuery, [firstName, lastName, branch, email, semister, phoneNumber, address]);
        const studentId = studentResult[0].insertId;

        // Insert student as user into users table with default admin role 0
        const insertUserQuery = 'INSERT INTO users (userName, password, adminRole) VALUES (?, ?, ?)';
        const userResult = await db.promise().query(insertUserQuery, [firstName, lastName, 0]);
        res.status(201).json({ message: 'Student added successfully', studentId });

	const insertVerificationQuery = 'INSERT INTO verification (studentId, verified) VALUES (?, ?)';
        await db.promise().query(insertVerificationQuery, [studentId, 1]);

    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Error adding student' });
    }
});
//Add routes for searching and marking attendance
// Endpoint to retrieve verified students
app.get('/nonverifiedstudents', (req, res) => {
    const query = `
        SELECT students.*
        FROM students
        
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error while fetching verified students: ' + err);
            return res.status(500).json({ error: 'Error while fetching verified students' });
        }
        res.status(200).json(results);
    });
});
// Endpoint to retrieve verified students
app.get('/verifiedstudents', (req, res) => {
    const query = `
        SELECT students.*
        FROM students
        LEFT JOIN verification ON students.id = verification.studentId
        WHERE verification.studentId IS NULL OR verification.verified = 0
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error while fetching non-verified students: ' + err);
            return res.status(500).json({ error: 'Error while fetching non-verified students' });
        }
        res.status(200).json(results);
    });
});
//mark verification
// Route for updating student verification status
// Route for updating student verification status
app.post('/verification', (req, res) => {
    const { studentId, verified } = req.body;

    // Validate request body
    if (!studentId || !verified) {
        return res.status(400).json({ error: 'Student ID and verification status are required' });
    }

    // Check if studentId already exists in the verification table
    const checkQuery = 'SELECT * FROM verification WHERE studentId = ?';
    db.query(checkQuery, [studentId], (err, rows) => {
        if (err) {
            console.error('Error checking if studentId exists:', err);
            return res.status(500).json({ error: 'Error checking if studentId exists' });
        }

        if (rows.length > 0) {
            // If studentId exists, update the verification status
            const updateQuery = 'UPDATE verification SET verified = ? WHERE studentId = ?';
            db.query(updateQuery, [verified, studentId], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating verification status:', updateErr);
                    return res.status(500).json({ error: 'Error updating verification status' });
                }
                res.status(200).json({ message: 'Verification status updated successfully' });
            });
        } else {
            // If studentId doesn't exist, insert a new record
            const insertQuery = 'INSERT INTO verification (studentId, verified) VALUES (?, ?)';
            db.query(insertQuery, [studentId, verified], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting new verification record:', insertErr);
                    return res.status(500).json({ error: 'Error inserting new verification record' });
                }
                res.status(200).json({ message: 'New verification record inserted successfully' });
            });
        }
    });
});
// Route for fetching student academics details by studentId
app.post('/academics', (req, res) => {
    const { studentId } = req.body;

    // Validate request body
    if (!studentId) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    // Query to fetch student academics details by studentId
    const query = 'SELECT * FROM studentAcademics WHERE studentId = ?';
    db.query(query, [studentId], (err, result) => {
        if (err) {
            console.error('Error fetching student academics details:', err);
            return res.status(500).json({ error: 'Error fetching student academics details' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Student academics details not found for the provided student ID' });
        }

        res.status(200).json({ message: 'Student academics details retrieved successfully', data: result });
    });
});
// Route for fetching student non-academics details by studentId
app.post('/nonacademics', (req, res) => {
    const { studentId } = req.body;

    // Validate request body
    if (!studentId) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    // Query to fetch student non-academics details by studentId
    const query = 'SELECT * FROM studentNonAcademics WHERE studentId = ?';
    db.query(query, [studentId], (err, result) => {
        if (err) {
            console.error('Error fetching student non-academics details:', err);
            return res.status(500).json({ error: 'Error fetching student non-academics details' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Student non-academics details not found for the provided student ID' });
        }

        res.status(200).json({ message: 'Student non-academics details retrieved successfully', data: result });
    });
});

//route for students to mark attendance
app.post('/markAttendance', (req, res) => {
  // Implement code to mark attendance for a student on the current date
    const { studentId, present } = req.body;
    const selectQuery = `SELECT a.* FROM studentState a JOIN (SELECT studentId, MAX(date) AS latest_date FROM studentState WHERE studentId = ? GROUP BY studentId) b ON a.studentId = b.studentId AND a.date = b.latest_date;
`;
    db.query(selectQuery,[studentId], async(err,result)=>{

	const user =result[0];
	
	
	if (!studentId) {
	    return res.status(400).json({ error: 'Student ID is required' });
	}
	// today's date
	const today = new Date().toISOString().split('T')[0];

	if(!(result.length ===0)){
	
	    const ltoday = new Date().toLocaleString().split(',')[0];
	    const dateindb = user.date.toLocaleString().split(',')[0];
	    console.log(dateindb);
	    console.log(today);
	    if(dateindb === ltoday){
		const query1 = 'UPDATE studentState SET present = ? WHERE studentId=? AND date=?';
		db.query(query1, [present,studentId,today], (err, result) => {
		    if (err) {
			console.error('Error marking attendance1: ' + err);
			return res.status(500).json({ error: 'Error marking attendance1' });
		    }
		    res.status(201).json({ message: 'Attendance marked successfully1' });
		}); 
	    }
	    else{
	  
	    const query = 'INSERT INTO studentState (studentId, date, present) VALUES (?, ?, ?)';
	    db.query(query, [studentId, today, present], (err, result) => {
		if (err) {
		    console.error('Error marking attendance: ' + err);
		    return res.status(500).json({ error: 'Error marking attendance' });
		}
		res.status(201).json({ message: 'Attendance marked successfully' });
	    });
	}
	}
	
	else{
	  
	    const query = 'INSERT INTO studentState (studentId, date, present) VALUES (?, ?, ?)';
	    db.query(query, [studentId, today, present], (err, result) => {
		if (err) {
		    console.error('Error marking attendance: ' + err);
		    return res.status(500).json({ error: 'Error marking attendance' });
		}
		res.status(201).json({ message: 'Attendance marked successfully' });
	    });
	}
  });
});
// Route for fetching subject average marks
app.post('/subjectAverageMarks', async (req, res) => {
  try {
    // Query to calculate average marks for each subject
    const query = `
      SELECT subject, AVG(totalMark) AS averageMark
      FROM (
        SELECT subject, totalMark FROM test1
        UNION ALL
        SELECT subject, totalMark FROM test2
      ) AS combined
      GROUP BY subject
    `;
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error calculating average marks for each subject:', err);
        return res.status(500).json({ error: 'Error calculating average marks for each subject' });
      }

      console.log('Subject average marks:', result); // Debugging: Log subject data

      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error calculating subject average marks:', error);
    res.status(500).json({ error: 'Error calculating subject average marks' });
  }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    console.log(req.body);
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
    const query = 'SELECT * FROM users WHERE userName=?';
    db.query(query, [username], async (err, result) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ error: 'Error retrieving the user:' });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials:' });
        }

        const user = result[0];
        // Check if password is correct
        if (user.password != password) return res.status(401).send('Invalid credentials: password wrong');

        // Create token with admin role
        const tokenPayload = {
            userId: user.id,
            adminRole: user.adminRole // Include admin role in the token payload
        };
        const token = jwt.sign(
            tokenPayload, // Payload
            process.env.JWT_SECRET_KEY, // Secret key from .env file
            { expiresIn: '24h' } // Token expiration time
        );

        res.json({ accessToken: token,firstName:username,lastName:password});
    });
});
//students
// Endpoint to fetch student details by name
// Update the /students endpoint to accept POST requests
app.post('/students', (req, res) => {
    const { firstName, lastName } = req.body;
    console.log(firstName,lastName);
    // Check if both first name and last name are provided in the request body
    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'Both first name and last name are required' });
    }

    // Construct query to search for students by name
    const query = `
        SELECT *
        FROM students
        WHERE firstName = ? AND lastName = ?
    `;
    
    // Execute the query with the provided first name and last name
    db.query(query, [firstName, lastName], (err, results) => {
        if (err) {
            console.error('Error fetching student details:', err);
            return res.status(500).json({ error: 'Error fetching student details' });
        }
        
        // Check if any student is found
        if (results.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Return the student details
        res.status(200).json(results);
    });
});

// Helper function to update verification status
// Helper function to update verification status
async function updateVerificationStatus(studentId) {
    const updateQuery = 'UPDATE verification SET verified = 0 WHERE studentId = ?';
    try {
        await db.promise().query(updateQuery, [studentId]);
    } catch (error) {
        console.error('Error updating verification status:', error);
        throw new Error('Error updating verification status');
    }
}

// Add academics data
app.post('/addacademics', async (req, res) => {
    const { studentId, grade, subject, semester } = req.body;

    // Validate request body
    if (!studentId || !grade || !subject || !semester) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert data into studentAcademics table
        const insertQuery = 'INSERT INTO studentAcademics (studentId, grade, subject, semester) VALUES (?, ?, ?, ?)';
        await db.promise().query(insertQuery, [studentId, grade, subject, semester]);
        await updateVerificationStatus(studentId)
        res.status(201).json({ message: 'Data added successfully to studentAcademics' });
    } catch (error) {
        console.error('Error adding academics data:', error);
        res.status(500).json({ error: 'Error adding data to studentAcademics' });
    }
});



// Add non-academics data
app.post('/addnonacademics', async (req, res) => {
    const { studentId, program, organization, duration } = req.body;

    // Validate request body
    if (!studentId || !program || !organization || !duration) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the studentId already exists in the table
    const checkQuery = 'SELECT * FROM studentNonAcademics WHERE studentId = ?';
    try {
        const [rows] = await db.promise().query(checkQuery, [studentId]);
        if (rows.length === 0) {
            // If studentId does not exist, insert a new record
            const insertQuery = 'INSERT INTO studentNonAcademics (studentId, program, organization, duration) VALUES (?, ?, ?, ?)';
            await db.promise().query(insertQuery, [studentId, program, organization, duration]);
        } else {
            // If studentId exists, update the existing record
            const updateQuery = 'UPDATE studentNonAcademics SET program = ?, organization = ?, duration = ? WHERE studentId = ?';
            await db.promise().query(updateQuery, [program, organization, duration, studentId]);
        }
        
        await updateVerificationStatus(studentId); // Update verification status
        res.status(201).json({ message: 'Data added successfully to studentNonAcademics' });
    } catch (error) {
        console.error('Error adding non-academics data:', error);
        res.status(500).json({ error: 'Error adding data to studentNonAcademics' });
    }
});


//addmarks1
app.post('/addmarks1', (req, res) => {
    const { studentId, subject, totalMark, co1, co2 } = req.body;

    // Check if the studentId already exists in the table
    const checkQuery = 'SELECT * FROM test1 WHERE studentId = ?';
    db.query(checkQuery, [studentId], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking if studentId exists:', checkErr);
            return res.status(500).json({ error: 'Error checking if studentId exists' });
        }

        if (checkResult.length === 0) {
            // If studentId does not exist, insert a new record
            const insertQuery = 'INSERT INTO test1 (studentId, subject, totalMark, co1, co2) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [studentId, subject, totalMark, co1, co2], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting marks into test1:', insertErr);
                    return res.status(500).json({ error: 'Error inserting marks into test1' });
                }
                res.status(201).json({ message: 'Marks added successfully to test1' });
            });
        } else {
            // If studentId exists, update the existing record
            const updateQuery = 'UPDATE test1 SET subject = ?, totalMark = ?, co1 = ?, co2 = ? WHERE studentId = ?';
            db.query(updateQuery, [subject, totalMark, co1, co2, studentId], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating marks in test1:', updateErr);
                    return res.status(500).json({ error: 'Error updating marks in test1' });
                }
                res.status(200).json({ message: 'Marks updated successfully in test1' });
            });
        }
    });
});

//addmarks2
app.post('/addmarks2', (req, res) => {
    const { studentId, subject, totalMark, co3, co4 } = req.body;

    // Check if the studentId already exists in the table
    const checkQuery = 'SELECT * FROM test2 WHERE studentId = ?';
    db.query(checkQuery, [studentId], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking if studentId exists:', checkErr);
            return res.status(500).json({ error: 'Error checking if studentId exists' });
        }

        if (checkResult.length === 0) {
            // If studentId does not exist, insert a new record
            const insertQuery = 'INSERT INTO test2 (studentId, subject, totalMark, co3, co4) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [studentId, subject, totalMark, co3, co4], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting marks into test2:', insertErr);
                    return res.status(500).json({ error: 'Error inserting marks into test2' });
                }
                res.status(201).json({ message: 'Marks added successfully to test2' });
            });
        } else {
            // If studentId exists, update the existing record
            const updateQuery = 'UPDATE test2 SET subject = ?, totalMark = ?, co3 = ?, co4 = ? WHERE studentId = ?';
            db.query(updateQuery, [subject, totalMark, co3, co4, studentId], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating marks in test2:', updateErr);
                    return res.status(500).json({ error: 'Error updating marks in test2' });
                }
                res.status(200).json({ message: 'Marks updated successfully in test2' });
            });
        }
    });
});


// A protected route example 
app.get('/protected-route', authenticateToken, (req,res)=>{
    res.send(`Welcome! You're authenticated.`);
});

//start the server
app.listen(port,'0.0.0.0',() =>{
    console.log(`Server is runnting on http://0.0.0.0:${port}`);
});
