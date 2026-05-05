import express from 'express';
import authMiddleware from '../middlewares/auth';
import { placeOrder } from '../controllers/orderController';


const orderRoute = express.Router();

orderRoute.post('/place', authMiddleware, placeOrder)

export default orderRoute