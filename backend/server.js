import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRoute from './routes/userRoute.js';
import 'dotenv/config'
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

// app config
const app = express();
const port = 4000

// middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// api endpoint
app.use('/api/food', foodRouter)
app.use('images', express.static('uploads'))
app.use('/api/user', userRoute)
app.use('/api/cart', cartRoute)
app.use('api/order', orderRoute)

app.get('/', (req, res)=> {
    res.send('API WORKING')
})

app.listen(port, ()=> console.log(`Server is running on the port ${port}`))

// mongodb+srv://fodlullah:<db_password>@node-tut.hcdibau.mongodb.net/?appName=node-tut
