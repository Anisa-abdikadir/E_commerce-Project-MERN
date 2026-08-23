import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {backendUrl, currency} from '../App'
import {toast} from 'react-toastify'
import { assets } from '../assets/assets'


const Orders = ({token}) => {
  const [orders,setOrders]=useState([])

 const fetchAllOrders = async () => {
  if (!token) {
    return null;
  }

  try {
    const response = await axios.post(backendUrl + "/api/order/List",{},
      { headers: { token } }
    );

    console.log(response.data);

    if (response.data.success) {
      setOrders(response.data.orders.reverse());
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
const statusHandler =async(event,orderId)=>{
  try {
    const response = await axios.post(backendUrl + '/api/order/status',{orderId, status:event.target.value},
      {headers:{token}})
      if (response.data.success) {
        await fetchAllOrders()
        
      }
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
    
  }
}

useEffect(() => {
  fetchAllOrders();
}, [token]);
  return (
    <div>
      <h3>Order  page</h3>
      <div>
        {
          orders.map((Orders,index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5
            md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>

              {/* display order item name */}
              <div>
                {
                  Orders.items.map((item,index)=>{
                    if (index === Orders.items.length -1) {
                      return <p className='py-0.5' key={index }>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      
                    }
                    else{
                          return <p className='py-0.5' key={index }>{item.name} x {item.quantity} <span>{item.size}</span>,</p>

                    }

                  })}
              </div>
              <p className='mt-3 mb-2 font-medium'>{Orders.address.firstName + "" +Orders.address.lastName}</p>
              {/* to display user address */}
              <div>
                <p>{Orders.address.street + ","}</p>
                <p>{Orders.address.City + "," + Orders.address.state + ", " + Orders.address.country + ", " + Orders.address.zipcode}</p>

              </div>
              <p>{Orders.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items:{Orders.items.length}</p>
              <p className='mt-3'>Method:{Orders.paymentMethod}</p>
              <p>Payment: {Orders.payment ? 'Done' : 'pending'}</p>
              <p>Date: {new Date(Orders.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{Orders.amount}</p>
            <select onChange={(event)=>statusHandler(event,Orders._id)} value={Orders.status} className='font-semibold p-2' >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivey</option>
              <option value="Delivered">Delivered</option>

            </select>
            </div>


          ))}
          
        
      </div>
      
    </div>
  )
}

export default Orders
