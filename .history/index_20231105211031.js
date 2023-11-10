const express =require('express')
const app = express()
const mysql = require('mysql')
const port =  3001;


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

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
      "SELECT * FROM `signup` WHERE email = ? AND password = ?",
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