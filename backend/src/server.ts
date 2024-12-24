import express  from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import  propertyRouter from "./routes/propertyRoutes";


dotenv.config();

// DB Connection
const mongoURL = process.env.MONGO_DB_URL|| '';

// only start the server if we connect to mongo db
mongoose.connect(mongoURL,{retryWrites:true}).then((response)=>{
    app.listen(3001,()=>{
          console.log('Conneciton estabilished');
     })  
}).catch(err=>console.error(err.message))

const app = express();

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(cors());

app.get('/ping',(req,res)=>{
     res.status(200).json({message:'Pong'})
})

app.use('/properties', propertyRouter);