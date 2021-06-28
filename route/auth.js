require('dotenv').config()
const User=require('../model/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

module.exports=(app)=>{
    
    //register
    app.post('/api/auth/register',(req,res)=>{
        const {name,email,password}=req.body

        if(!name||!email||!password)
        {
            return res.status(400).json({msg:'Please enter all fields'})
        }
        User.findOne({email})
            .then(user=>{
                if(user)
                {
                    return res.status(400).json({msg:'user already exist'})
                }
                else
                {
                    const newUser=new User({
                        name,
                        email,
                        password
                    })

                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(newUser.password,salt,(err,hash)=>{
                            if(err) throw err;

                            newUser.password=hash;
                            newUser.save()
                                    .then(user=>{
                                        jwt.sign(
                                            {id:user.id},
                                            process.env.jwtSecret,
                                            {expiresIn:7*3600},
                                            (err,token)=>{
                                                if(err) throw err;

                                                res.json({
                                                    token,
                                                    user:{
                                                        id:user.id,
                                                        name:user.name,
                                                        email:user.email
                                                    }
                                                })
                                            }
                                        )
                                    })
                                    .catch(err=>{
                                        return res.status(500).json(err)
                                    })
                        })
                    })

                }
            })
            .catch(err=>{
                return res.status(500).json(err)
            })
        


    })

    //login
    app.post('/api/auth/login',(req,res)=>{
        const {email,password}=req.body
        if(!email||!password)
        {
            return res.status(400).json({msg:"please enter all fields"})
        }

        User.findOne({email})
            .then(user=>{
                if(!user)
                {
                    return res.status(400).json({msg:"user does not exist"})
                }

                //compare password
                bcrypt.compare(password,user.password)
                    .then(isMatch=>{
                        if(!isMatch)
                        {
                            return  res.status(400).json({msg:"Invalid User"})
                        }

                        jwt.sign(
                            {id:user.id},
                            process.env.jwtSecret,
                            {expiresIn:7*3600},
                            (err,token)=>{
                                if(err) throw err;
                                res.json({
                                    token,
                                    user:{
                                        id:user.id,
                                        name:user.name,
                                        email:user.email
                                    }
                                })
                            }
                        )

                    })
                    .catch(err=>{
                        return res.status(500).json(err)
                    })
            })
            .catch(err=>{
                return res.status(500).json(err)
            })


    })

    //get user from token
    app.get('/api/auth/getUser',(req,res)=>{
        const token=req.header('x-auth-token')

        if(!token)
        {
            return res.status(400).json({msg:"No token,Unauthorised user"})
        }

        try
        {
            const decoded=jwt.verify(token,process.env.jwtSecret)
            User.findById(decoded.id)
                .select('-password')
                .then(user=>res.status(200).json(user))
                .catch(err=>res.json(err))

        }
        catch(e)
        {
            return res.status(400).json({msg:"Token is not valid"})
        }
    })

}