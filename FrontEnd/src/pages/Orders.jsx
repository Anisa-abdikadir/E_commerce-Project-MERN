
import { useContext, useEffect } from "react"
import Title from "../Components/Title"
import { ShopContext } from "../Context/ShopContext"
import { useState } from "react"
import axios from "axios"

const Orders = () => {
  const{backendUrl,token,currency}=useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  const [loading, setLoading] = useState(true)



  const loadOrderDate = async()=>{
    try {
          setLoading(true)

      if (!token) {
        return null
        
      }
      const response = await axios.post(backendUrl + '/api/order/userOrders',{},{headers:{token}})
      if(response.data.success){
        let allOrdersItem =[];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item ['payment'] = order.payment
            item ['paymentMethod']= order.paymentMethod
            item ['date'] = order.date
            allOrdersItem.push(item)

          })
        })
        setOrderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      console.log(error)
      
    }
    finally {
  setLoading(false)
}
  }
  useEffect(()=>{
    loadOrderDate()
  },[token])

  if (loading) {
  return (
    <div className="flex flex-col md:flex-row gap-8 animate-pulse">

      {/* Images Skeleton */}
      <div className="flex-1">
        <div className="w-full h-[400px] bg-gray-200 rounded"></div>

        <div className="flex gap-3 mt-4">
          <div className="w-20 h-20 bg-gray-200 rounded"></div>
          <div className="w-20 h-20 bg-gray-200 rounded"></div>
          <div className="w-20 h-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="flex-1 flex flex-col gap-4">

        <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

        <div className="h-5 w-32 bg-gray-200 rounded"></div>

        <div className="h-20 w-full bg-gray-200 rounded"></div>

        <div className="h-6 w-24 bg-gray-200 rounded"></div>

        {/* Size */}
        <div className="flex gap-3">
          <div className="h-10 w-12 bg-gray-200 rounded"></div>
          <div className="h-10 w-12 bg-gray-200 rounded"></div>
          <div className="h-10 w-12 bg-gray-200 rounded"></div>
          <div className="h-10 w-12 bg-gray-200 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-12 w-40 bg-gray-200 rounded"></div>

      </div>

    </div>
  )
}

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row 
            md:items-center md:justify-between gap-4">
              <div className=" flex gap-6 items-start text-sm">
                <img className="w-16 sm:w-20  " src={item.image[0]} alt="" />
                <div>
                  <p className="font-medium sm:text-base">{item.name}</p>
                  
                  <div className="flex items-center gap-3  mt-2 text-gray-700">
                    <p>{currency}{item.price}</p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size: {item.size}</p>

                  </div>
                  <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>

                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base ">{item.status}</p>
              </div>
              {/* when load data update the status */}
              <button onClick={loadOrderDate} className="border cursor-pointer px-4 py-2 text-sm font-medium rounded-sm">Track Oder</button>

              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}
export default Orders