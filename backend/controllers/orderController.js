import orderModel from "../model/orderModel";
import userModel from '../model/userModel';
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

export {placeOrder}