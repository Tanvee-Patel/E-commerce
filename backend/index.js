const express = require ('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const cookieParser = require ('cookie-parser')
require ('dotenv').config();
const authRouter = require ('./routes/authRoute')

const app = express()
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully!"))
.catch((err)=> console.error(err));

app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'DELETE', 'PUT'],
   credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use('/auth',authRouter)