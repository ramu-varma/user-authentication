const User=require("../Models/user")
const bcrypt= require('bcrypt')
const jwt =require("jsonwebtoken")
const register=async(req,res)=>{
    try{
    const {username,email,password}=req.body
    console.log(username,email,password)

    
    const exisistUser=await User.findByEmail(email)
    if(exisistUser){
        return res.status(409).json({message:"user  is already present"})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const user=new User({
        username,
        email,
        password:hashedPassword
    })
    await user.save()
res.status(200).json({message:"registerd successfully",data:{name:user.username,email:user.email}})
    }
    catch(error){
        console.error("error:",error);
    }
}

const login= async(req,res)=>{
    const{email,password}=req.body
    const user=await User.findByEmail(email)
    if(!user) return res.status(404).json({message:"invalid credentials"})


const isPassword=await bcrypt.compare(password,user.password);
if(!isPassword){
return res.status(401).json({message:"invalid credentials"})
}
const token=jwt.sign({id:user.id},process.env.SECRETKEY)
res.cookie('token',token)
res.status(200).json({message:"sucess"})

}
const rename=async(req,res)=>{
    try{
    const{id,username,password}=req.body;
    
    const user=await User.findByIdAndUpdate(id,{username:username,password:password},{new:true});

res.status(200).json({msg:"updates successful",data:user})
    }
    catch(error){
        console.error("error;",error);
    }
}

const allData=async(req,res)=>{
    try{
    const allUsers=await User.find();
    res.status(200).json({message:"users",data:allUsers})}
    catch(error){
        console.error(error);
    }
}
const getProfile=async(req,res)=>{
    const user =req.user
   
    console.log(user)
    res.status(200).json({messag:"success" ,data:user})
    
}
module.exports={register,login,rename,allData,getProfile}
