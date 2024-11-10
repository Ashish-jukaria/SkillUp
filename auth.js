const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
JWT_SECRET=process.env.JWT_SECRET
JWT_ADMIN_SECRET='admin'

function Auth(req,res,next){
    console.log(req.url)
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

function AdminAuth(req,res,next){
    console.log(req.url)
    token=req.headers.token

    try{
        verified_token=jwt.verify(token,JWT_ADMIN_SECRET)

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
    JWT_SECRET:JWT_SECRET,
    JWT_ADMIN_SECRET:JWT_ADMIN_SECRET,
    AdminAuth:AdminAuth
}