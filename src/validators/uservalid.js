const joi=require('joi')
const register1=joi.object({
 username:joi.string().min(3).max(15).required(),
 email:joi.string().email().required(),
 password:joi.string().required()
})
const login1=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(  )
})
module.exports={register1,login1}