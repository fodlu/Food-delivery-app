import orderModel from "../model/orderModel.js";
import userModel from '../model/userModel.js';
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET)

// placing user order from frontend
const placeOrder = async (req, res) => {

    const frontendURL = 'http://localhost:5173'

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: re.body.amount,
            address: req.body.address,
            })
            await newOrder.save();
            await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

            // this line is necessary for the stripe payment
            const lineItem = req.body.items.map((item)=> ({
                priceData: {
                    currency: "nai",
                    productData: {
                        name: item.name,
                    },
                    unitAmount: item.price * 100 * 80,
                },
                quantity: item.quantity
            }))

            lineItem.push({
                priceData: {
                    currency: 'nai',
                    productData: {
                        name: 'Delivery Charges'
                    },
                    unitAmount: 2 * 100 * 80
                },
                quantity: 1
            })

            const session = await stripe.checkout.sessions.create({
                line_items: lineItem,
                mode: 'payment',
                success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder._id}`,
            })

            res.json({success: true, session_url: session.url})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"})
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error'})
    }
}

// users order for frontend
const usersOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: order})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message: 'Status updated'})
        res.json({success: true, message: 'Status updated'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Error'})
    }
}

export {placeOrder, verifyOrder, usersOrder, listOrders, updateStatus }