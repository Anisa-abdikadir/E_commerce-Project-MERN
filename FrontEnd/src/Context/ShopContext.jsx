import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets"; product date apii ahan uso qadane 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext=createContext();
const ShopContextPrivider =(props)=>{

    const currency='$';
    const delivery_fee=10;
    // URRL
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const[Search,setSearch]=useState('')
    const[showSearch,setShowSerach]=useState(false)
    const[cartItems,setCartItem]=useState({});
    // url product
    const[products,setProducts]=useState([])
    const [token,setToken]=useState('')
    const navigate=useNavigate();

    const Addcart = async (itemId, size) => {

        if(!size){
            toast.error('select Product Size');
            return;
        }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }
    } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }

    setCartItem(cartData);
    if (token) {
        try {
            await axios.post(backendUrl+ '/api/cart/add',{itemId,size},{headers:{token}})
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
        
    }
};

const getCartCount=()=>{
    let totalCound =0;
    for(const items in  cartItems){
        for(const item in cartItems[items]){
            try{
                if(cartItems[items][item]>0){
                    totalCound += cartItems[items][item];


                }
            }catch(error){

            }
            
        }
    }return totalCound;
}

// const updateQuentity=async(itemId, size ,quantity)=>{
//     let cartData=structuredClone(cartItems);
//     cartData[itemId][size] = quantity;
//     setCartItem(cartData)

//     if (token) {
//         try {
//             await axios.post(backendUrl + '/api/cart/Update',{itemId,size,quantity}, {headers:{token}})
            
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
            
//         }
        
//     }
// }
const updateQuentity = async (itemId, size, quantity) => {
    try {
        // 1. Update frontend immediately
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity;

        setCartItem(cartData);

        // 2. Update MongoDB
        if (token) {
            const response = await axios.post(
                backendUrl + '/api/cart/Update',
                {
                    itemId,
                    size,
                    quantity
                },
                {
                    headers: {
                        token: token
                    }
                }
            );

            console.log("UPDATE CART RESPONSE:", response.data);

            if (!response.data.success) {
                toast.error(response.data.message);
                return;
            }

            console.log("MongoDB cart updated successfully");
        }

    } catch (error) {
        console.log("UPDATE CART ERROR:", error);
        console.log("SERVER RESPONSE:", error.response?.data);

        toast.error(
            error.response?.data?.message || error.message
        );
    }
};

const getCartAmount =() => {
    let totalAmoun=0;
    for(const items in cartItems){
        let itemInfo =products.find((product)=>product._id===items);
        for(const item in cartItems[items]){
            try {
                if(cartItems[items][item] > 0){
                    totalAmoun+= itemInfo.price * cartItems[items][item];
                }
                
            } catch (error) {
                
            }
        }
    }return totalAmoun;

}
const getProductsData = async () => {
  try {
    const response = await axios.get(backendUrl + '/api/product/List');

    if (response.data.success) {
      setProducts(response.data.products);
    } else {
      toast.error(response.data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || error.message
    );
  }
};  
const getUserCart = async(token)=>{
    try {

        const reponse = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
        if(reponse.data.success){
            setCartItem(reponse.data.cartData)
        }
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
}
useEffect(()=>{
    getProductsData()
},[])

useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
        
    }
},[])

    const value={
        products , currency,delivery_fee,
        Search,setSearch,showSearch,setShowSerach,
        cartItems,setCartItem,Addcart,getCartCount,updateQuentity,
        getCartAmount,navigate,backendUrl,setToken,token

    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextPrivider;