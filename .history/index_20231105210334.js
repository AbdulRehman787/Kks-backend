const express =require('express')
const app = express()
const mysql = require('mysql')
const port =  3000


const db= mysql.createConnection({
    host:"localhost",
    database:"school",
    password:"",
    user:"root"
})

db.connect(())

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(port,(err,res)=>{
    if(err){
        throw err
    }else{
        console.log(`Server is running on http://localhost:${port}`)
    }

})