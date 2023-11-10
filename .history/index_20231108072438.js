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

app.delete('/deletesubject/:id', (req, res) => {
  const subjectId = req.params.id;

  const sql = "DELETE FROM `sub` WHERE SID = ?";
  const values = [subjectId];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error deleting subject:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ message: "Subject deleted successfully" });
  });
});

app.delete('/deleteclass/:id', (req, res) => {
  const subjectId = req.params.id;

  const sql = "DELETE FROM `sub` WHERE SID = ?";
  const values = [subjectId];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error deleting subject:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ message: "Subject deleted successfully" });
  });
});

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


app.post('/addexam',(req,res)=>{
  const sql = "INSERT INTO `exam`(`ENAME`, `ETYPE`, `EDATE`, `SESSION`, `CLASS`, `SUB`) VALUES (?,?,?,?,?,?)"
  const values=[
    req.body.ENAME,
    req.body.ETYPE,
    req.body.EDATE,
    req.body.SESSION,
    req.body.CLASS,
    req.body.SUB
  ]
  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error deleting subject:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ message: "Subject deleted successfully" });
  });
})



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