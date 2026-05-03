import userModel from '../model/userModel.js';

// add item to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: 'Added to cart'})
    } catch (error) {
        console.log('Error');
        res.json({success: false, message: "Error"})
    }
}

// remove item from user cart
const removeFromCart = async (req, res) => {}

// fetch item from user cart
const getCart = async (req, res) => {}

export{addToCart, removeFromCart, getCart}