const User=require('../Models/user');
const jwt=require('jsonwebtoken')
const authCheck=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({message:"invalid token"})
    }
    const decoded= jwt.verify(token,"ramy@123vaRmaTom@31");
    const  user=await User.findById(decoded.id)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
req.user=user
next()
}
module.exports=authCheck