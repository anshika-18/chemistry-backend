const Score=require('../model/score')

module.exports=(app)=>{

    app.post('/api/result/marks',(req,res)=>{
        const {email,quizNumber,score}=req.body

        if(!email||!quizNumber||!score)
        {
            return res.status(400).json({msg:"something not available"})
        }

        Score.findOne({email})
            .then(user=>{
                
                if(user)
                {
                    Score.find({email,"marks.quizNumber":quizNumber})
                        .then(re=>{
                            //console.log(re)
                            if(re.length!==0)
                            {
                                return res.status(400).json({msg:"already attempted",user:re})
                            }
                            else
                            {
                                user.marks.push({
                                    quizNumber,
                                    score
                                })
            
                                user.save()
                                    .then(data=>{
                                        return res.status(200).json(data)
                                    })
                                    .catch(err=>{
                                        return res.status(400).json(err)
                                     })
                            }
                            
                        })
                        .catch(err=>{
                            return res.status(500).json(err)
                        })

                }
                else
                {
                    const scoreBoard=new Score({
                        email,
                        marks:[
                            {
                                quizNumber,
                                score
                            }
                        ]
                    })


                    scoreBoard.save()
                            .then(user=>{
                                return res.status(200).json(user)
                            })
                            .catch(err=>{
                                return res.status(500).jsom(err)
                            })

                }

            })
            .catch(err=>{
                return res.status(500).json(err)
            })
        
    })

    app.get('/api/result/getscore',(req,res)=>{
        const email=req.header('email')

        Score.findOne({email})
            .then(user=>{
                if(!user)
                {
                    return res.status(400).json({msg:"You Haven't attempted any Quiz"})
                }
                else
                {
                    return res.status(200).json({marks:user.marks})
                }
            })
            .catch(err=>{
                return res.status(400).json(err)
            })

    })

}