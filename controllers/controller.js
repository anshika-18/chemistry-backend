const Blog=require('../model/model')

exports.getAllBlogs=async(req,res)=>{
    let data;
    try{
        data=await Blog.find();
    }
    catch(err){
        if(err) return res.status(500).json(err);
    }
    res.status(200).json(data);
}

exports.create=async(req,res)=>{
    const newBlog=new Blog({
        title:req.body.title,
        author:req.body.author,
        desc:req.body.desc
    })
    let data;
    try{
        data=await newBlog.save()
    }
    catch(err)
    {
        if(err) return res.status(500).json(err) 
    }
    return res.status(201).json(data)
}