import userModel from "../models/userModel.js"
//add product to user Catd 
const addToCard = async(req,res)=>{
    try {
        const {userId,itemId, size}=req.body

        const userDate= await userModel.findById(userId)
        let cartData = userDate.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]+=1
                
            }
            else{
                cartData[itemId][size]=1
            }
            
        }else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        await  userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message: "Added to Cart"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}
//upadte use Card
// const UpdateCart = async(req, res)=>{

//     try {
//         const{userId,itemId,size,quantity}=req.body

//         const userDate = await userModel.findById(userId)
//         let cartData = await userDate.cartData;

//         cartData[itemId][size]=quantity

//          await  userModel.findByIdAndUpadate(userId,{cartData})
//         res.json({success:true,message: "Cart Upadate"})
        
//     } catch (error) {
//          console.log(error)
//         res.json({success:false,message:error.message})
        
        
//     }

// }

const UpdateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Cart Updated"
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};
//get user cart data 
const getUserCart = async(req,res)=>{

    try {
        const {userId}=req.body
         const userDate = await userModel.findById(userId)
        let cartData = await userDate.cartData;
        
         res.json({success:true,cartData})

    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
        
        
    }

}

export {addToCard,UpdateCart,getUserCart}
