const express =require('express')
const app = express()
const mysql = require('mysql')
const port =  3001;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db= mysql.createConnection({
    host:"localhost",
    database:"school",
    password:"",
    user:"root"
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('Database Connected')
    }
})

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.get("/admin", (req, res) => {
    db.query("SELECT * FROM `admin`  ", (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    });
});


app.post('/addclass',(req,res)=>{
  const sql = "INSERT INTO `class`( `CNAME`, `CSEC`) VALUES (?,?)";
  const values=[
    req.body.CNAME,
    req.body.CSEC,
  ]
  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error registering user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "User registered successfully" });
  })
})



app.get("/class", (req, res) => {
  db.query("SELECT * FROM `class`  ", (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.post('/addsubject', (req, res) => {
  const { SNAME } = req.body; // Destructuring SNAME from the request body

  const sql = "INSERT INTO `sub` (`SNAME`) VALUES (?)";
  const values = [SNAME];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error adding subject:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ message: "Subject added successfully" });
  });
});
Save to grepper
Key changes:

Destructured SNAME from req.body: The req.body object contains the data sent in the request body. Since you're sending SNAME in your React Native code, you need to destructure it from req.body.

Improved error handling: The modified code includes better error handling to provide more informative messages and status codes in case of an error during the database operation.

Ensure that you have the necessary express and mysql packages installed in your Node.js project:

bash
Copy code
npm install express mysql
Save to grepper
Additionally, make sure that your MySQL connection (db object) is correctly established before using these API endpoints.

Note: The provided code assumes that your sub table has a column named SNAME to store the subject names. Adjust the SQL query and table structure accordingly based on your database setup.






app.get("/subject", (req, res) => {
  db.query("SELECT * FROM `sub`  ", (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});



app.get("/staff", (req, res) => {
  db.query("SELECT * FROM `staff`  ", (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get("/staff", (req, res) => {
  db.query("SELECT * FROM `staff`  ", (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});




app.get("/exam", (req, res) => {
  db.query("SELECT * FROM `exam`  ", (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});




app.post("/login", (req, res) => {
    const email = req.body.email;
  
    const password = req.body.password;
    db.query(
      "SELECT * FROM `admin` WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send("Wrong username / password combination");
        }
      }
    );
  });

app.listen(port,(err,res)=>{
    if(err){
        throw err
    }else{
        console.log(`Server is running on http://localhost:${port}`)
    }

})