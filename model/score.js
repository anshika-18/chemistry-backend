const mongoose=require('mongoose')
const Schema=mongoose.Schema

const scoreSchema=Schema({
    email:{
        type:String,
        required:true
    },
    marks:[
        {
            quizNumber:{
                type:String,
                required:true
            },
            score:{
                type:String,
                required:true
            }
        }
    ]
})

module.exports=mongoose.model('Score',scoreSchema)