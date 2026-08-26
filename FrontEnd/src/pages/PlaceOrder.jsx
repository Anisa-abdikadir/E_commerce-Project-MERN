import Title from "../Components/Title"
import CartToltal from "../Components/CartToltal"
import { assets } from "../assets/frontend_assets/assets"
import { useContext, useState } from "react"
import { ShopContext } from "../Context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
const PlaceOrder = () => {
  const[method,setmethod]=useState('cod');

  const [loading, setLoading] = useState(false);
    const{navigate,backendUrl, token, cartItems, setCartItem, getCartAmount, delivery_fee, products}=useContext(ShopContext);


  const[formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })
  const onChangeHandler =(event)=>{
    const name = event.target.name
    const value=event.target.value

    // ...data wxay ka dhigantahay  so qad dhamman xogta hore
    setFormData(data=>({...data,[name]:value}))
  }


  const initPay = (order) => {

  console.log("RAZORPAY ORDER RECEIVED:", order);

  const options = {

    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Order Payment",
    description: "Order Payment",
    order_id: order.id,
    handler: async (response) => {

      console.log("RAZORPAY PAYMENT:", response);

      try {

        const { data } = await axios.post(
          backendUrl + "/api/order/verifyRazorpay",
          response,
          { headers: { token } }
        );

        if (data.success) {

          setCartItem({});

          navigate("/Orders");

        } else {

          toast.error(data.message);

        }

      } catch (error) {

        console.log(error);

        toast.error(error.message);

      }
    }
  };

  const rzp = new window.Razorpay(options);

  rzp.open();
};

 
  const onSubmitHandler =async(event)=>{
    event.preventDefault()
    try {
          setLoading(true);


      let orderItems =[]

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item]>0) {
            const itemIfo = structuredClone(products.find(product=>product._id=== items))

            if (itemIfo) {
              itemIfo.size=item
              itemIfo.quantity= cartItems[items][item]
              orderItems.push(itemIfo)
              
            }
            
          }
        }
      }
      // send api and store
       let orderData ={
        address:formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee,

        
      }

      switch(method){
        //api call for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
          if (response.data.message) {
            setCartItem({})
            navigate('/Orders')
            
          }else{
            toast.error(response.data.message)
          }
          break;
          case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})


            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data
              window.location.replace(session_url)
             
              
            }
            else{
              toast.error(responseStripe.data.message)
              
            }
            break;
            
          
            case 'razorpay':

    const responseRazorpay = await axios.post(
        backendUrl + '/api/order/razorpay',
        orderData,
        { headers: { token } }
    );
    if (responseRazorpay.data.success) {
      initPay(responseRazorpay.data.order)
      
    }

   
    break;


          default:
            break
      }
      // console.log(orderItems) for test
     
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
    finally {
  setLoading(false);

  }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row  justify-between gap-4  pt-5  sm:pt-14 min-h-[80vh]
    border-t">
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DALEVERY'} text2={'INFORMATION'}/>
        </div>
        <div className="flex gap-3 ">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="FIRST NAME" />
                    <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="LAST NAME" />
        </div>
          <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Email" />
          <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />

           <div className="flex gap-3 ">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="CITY" />
                    <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State " />
                    
        </div>
         <div className="flex gap-3 ">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="Number" placeholder="Zipcode" />
                    <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>
          <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="Nubart " placeholder="Phone" />

      </div>

      {/* right side */}
      <div className="mt-8">
        <div className="mt-8  min-w-8">
          <CartToltal/>

        </div>
        <div className="mt-12 ">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* PEYMENT SELECTION */}
          <div className="flex gap-3  flex-col  lg:flex-row">
            <div onClick={()=>setmethod('stripe')} className=" flex gap-3 items-center cursor-pointer border p-2 px-3 " >
              <p className={`min-w-3.5 h-3.5 border  rounded-full ${method==='stripe'?'bg-green-400':''}`}></p>

                <img className="h-5  mx-4" src={assets.stripe_logo} alt="" />

            </div>

            <div onClick={()=>setmethod('razorpay')} className=" flex gap-3 items-center cursor-pointer border p-2 px-3 " >
              <p className={`min-w-3.5 h-3.5 border  rounded-full ${method==='razorpay'?'bg-green-400':''}`}></p>

                <img className="h-5  mx-4" src={assets.razorpay_logo} alt="" />

            </div>
            <div onClick={()=>setmethod('cod')} className=" flex gap-3 items-center cursor-pointer border p-2 px-3 " >
              <p className={`min-w-3.5 h-3.5 border  rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">CASH ON DELIVERY</p>

            </div>

          </div>

          <div className="w-full text-end mt-8">

            <button disabled={loading} className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-all duration-300">{loading?'Loading...':'PLACE ORDER'}</button>

          </div>

        </div>

      </div>

    </form>
  )
}
export default PlaceOrder