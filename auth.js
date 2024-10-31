const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
JWT_SECRET=process.env.JWT_SECRET

function Auth(req,res,next){
    token=req.headers.token

    try{
        verified_token=jwt.verify(token,JWT_SECRET)

        if (verified_token){
            req.id=verified_token.id
            console.log(req.id)
            next()
        }

        else{
            res.status(401).send({message:'Invalid token'})

        }
    }
    catch(e){
        res.status(401).send({message:'Invalid token'})

    }
    

 

}

module.exports={
    Auth:Auth,
    JWT_SECRET:JWT_SECRET
}