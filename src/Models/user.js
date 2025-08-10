const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    email:{
type:String,
unique:true,
required:true,
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:18

    }
    
})
userSchema.methods.toJSON=function(){
    const user=this.toObject();
    delete user.password
    return user
}
userSchema.statics.findByEmail= function(email){
    return this.findOne({email})
}
const User=mongoose.model('User',userSchema)
module.exports=User