const mongoose=require("mongoose")

const chemBlogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Blog',chemBlogSchema)