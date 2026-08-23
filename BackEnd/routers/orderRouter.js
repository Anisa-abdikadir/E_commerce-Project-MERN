import express from 'express'

import {placeOrder,placeOrderStrip,placeOrderRazorpay,AllOrders,userOrder,upadateStatus, verifyStripe ,verifyRazorpay} from "../Controller/orderController.js"
import AdminAuth from '../Middleware/AdminAuth.js';
import authUser from '../Middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post("/List",AdminAuth ,AllOrders);
orderRouter.post('/status',AdminAuth,upadateStatus)

// payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStrip)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// use Feature
orderRouter.post('/userorders',authUser,userOrder)

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)
export default orderRouter

