module.exports=(app)=>{

    const blog=require('../controllers/controller')
    app.get('/blog',blog.getAllBlogs)
    app.post('/create',blog.create)
}