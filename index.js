import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js"
import AuthRoutes from "./routes/auth.route.js"
dotenv.config()
const app = express()
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mogodb connected")
})
app.use(express.json())
app.use(cors())
app.listen(process.env.PORT,()=>{
    console.log(`Server listen on the port ${process.env.PORT}`)
})
app.use('/api/user',userRoutes)
app.use('/api/auth',AuthRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
