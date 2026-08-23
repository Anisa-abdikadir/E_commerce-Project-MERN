import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";

//global variables
const currency = "usd";
const deliveryCharges = 10;

//geteway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
//placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    //save in database
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing order usign strip method
const placeOrderStrip = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "delivery charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });
    // wuxuu isku xiraa Order-kaaga MongoDB iyo Stripe payment page-ka.
    //  stripe.checkout.sessions.create() Ii samee payment session uu customer-ku lacag ku bixin karo.

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    // update order status to payment true if payment is successful
    await orderModel.findByIdAndUpdate(newOrder._id, { payment: true });
    res.json({ success: true, session_url: session.url });

    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Verify strip
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// placeOrders  using Rezorpay methos
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
  amount: Math.round(amount * 100),
  currency: "INR",
  receipt: newOrder._id.toString(),
};

const razorpayOrder = await razorpayInstance.orders.create(options);

res.json({
  success: true,
  order: razorpayOrder
});
   
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try{
    const { razorpay_order_id, userId } = req.body;
    const orderIfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderIfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderIfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true , message: "Payment successful" });
    }else{
      res.json({ success: false , message: "Payment failed" });
    }

  }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
    
}


// place all orders
const AllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user Order

const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// only admin upadte Status
//upadate order status from admin panel
const upadateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStrip,
  placeOrderRazorpay,
  AllOrders,
  userOrder,
  upadateStatus,
  verifyRazorpay
};
