const express=require("express")
const router=express.Router()
const {register,login,rename, allData,getProfile}=require('../controllers/userController')
const{register1,login1}=require('../validators/uservalid')
const validate=require('../middeleware/vlidate')
const authCheck=require('../middeleware/authChecker')

router.post('/register',validate(register1),register)
router.post('/login',validate(login1),login)
router.put('/rename',rename)
router.get('/data',allData)
router.get('/profile',authCheck,getProfile)
module.exports=router