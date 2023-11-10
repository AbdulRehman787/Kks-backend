const express =require('express')
const app = express()

const port =  3000

app.get('/',(req,res)=>{
    res.send("Hello World")
})


app.listen(port,(err,res)=>{
    if(err){
        throw err
    }else{
        console.log(`Server is running on http://localhost:{port}`)
    }

})