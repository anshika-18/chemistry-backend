require("dotenv").config()
const express=require('express')
const app=express();
const mongoose=require("mongoose");
const bodyparser=require("body-parser")
const cors=require("cors");

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log("database is connected")
}).catch((err)=>{
    console.log(err);
})

app.get('/',(req,res)=>{
    res.send("welcome")
})

require('./routes/route')(app);

app.get('*',(req,res,next)=>{
    res.status(404).json({"msg":"page not found"});
})

const PORT=process.env.PORT||3000;

app.listen(PORT,(err)=>{
    if(err) console.log(err)
    else
    {
        console.log(`Port is live at ${PORT}`);
    }
})
