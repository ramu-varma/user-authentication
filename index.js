require('dotenv').config();
const express=require("express")
const app=express();
const connectDb=require("./src/db")

const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const router=require('./src/routes/userRoutes')
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use("/api/users",router)
connectDb().then(()=>{console.log("database is connecting")

app.listen(process.env.PORT,()=>{
    console.log("server started at 5000 ")
})
})
.catch(()=>console.log("something went wrong"))
