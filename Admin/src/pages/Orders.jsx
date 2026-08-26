import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchAllOrders = async () => {

    try {

      setLoading(true)
      setError(false)

      const response = await axios.post(
        backendUrl + '/api/order/List',
        {},
        {
          headers: {
            token: token
          }
        }
      )

      if (response.data.success) {

        // Si skeleton-ku ugu ekaado List component-ka
        setTimeout(() => {

          setOrders(response.data.orders.reverse())
          setLoading(false)

        }, 1000)

      } else {

        setError(true)
        setLoading(false)

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)

      setError(true)
      setLoading(false)

      toast.error(
        error.response?.data?.message ||
        'Server error. Please try again.'
      )

    }

  }


  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: event.target.value
        },
        {
          headers: {
            token: token
          }
        }
      )

      if (response.data.success) {

        await fetchAllOrders()

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        'Server error. Please try again.'
      )

    }

  }


  useEffect(() => {

    if (token) {
      fetchAllOrders()
    }

  }, [token])


  return (

    <>

      <p className='mb-2'>
        All Orders
      </p>


      {/* ================= LOADING ================= */}

      {loading && (

        <div className='flex flex-col gap-2'>

          {/* Skeleton Header */}

          <div className='hidden md:grid grid-cols-[0.5fr_3fr_1.5fr_1fr_1.5fr] items-center py-2 px-3 border bg-gray-100 text-sm'>

            <div className='h-4 bg-gray-300 rounded animate-pulse'></div>

            <div className='h-4 bg-gray-300 rounded animate-pulse'></div>

            <div className='h-4 bg-gray-300 rounded animate-pulse'></div>

            <div className='h-4 bg-gray-300 rounded animate-pulse'></div>

            <div className='h-4 bg-gray-300 rounded animate-pulse'></div>

          </div>


          {/* Skeleton Rows */}

          {[1, 2, 3, 4, 5].map((item) => (

            <div
              key={item}
              className='grid grid-cols-1 sm:grid-cols-[0.5fr_3fr_1.5fr_1fr_1.5fr] items-start gap-3 py-4 px-3 border'
            >

              {/* Parcel */}

              <div className='w-12 h-12 bg-gray-200 rounded animate-pulse'></div>


              {/* Customer / Items */}

              <div className='space-y-3'>

                <div className='h-3 w-3/4 bg-gray-200 rounded animate-pulse'></div>

                <div className='h-3 w-1/2 bg-gray-200 rounded animate-pulse'></div>

                <div className='h-3 w-2/3 bg-gray-200 rounded animate-pulse'></div>

                <div className='h-3 w-4/5 bg-gray-200 rounded animate-pulse'></div>

              </div>


              {/* Order information */}

              <div className='space-y-3'>

                <div className='h-3 w-20 bg-gray-200 rounded animate-pulse'></div>

                <div className='h-3 w-24 bg-gray-200 rounded animate-pulse'></div>

                <div className='h-3 w-28 bg-gray-200 rounded animate-pulse'></div>

                <div className='h-3 w-20 bg-gray-200 rounded animate-pulse'></div>

              </div>


              {/* Price */}

              <div className='h-4 w-16 bg-gray-200 rounded animate-pulse'></div>


              {/* Status */}

              <div className='h-9 w-full bg-gray-200 rounded animate-pulse'></div>

            </div>

          ))}

        </div>

      )}


      {/* ================= ERROR ================= */}

      {!loading && error && (

        <div className='border rounded p-8 text-center'>

          <p className='text-red-500 text-lg font-medium mb-2'>
            Something went wrong
          </p>

          <p className='text-gray-500 text-sm mb-4'>
            We couldn't load the orders from the server.
          </p>

          <button
            onClick={fetchAllOrders}
            className='bg-black text-white px-5 py-2 rounded'
          >
            Try Again
          </button>

        </div>

      )}


      {/* ================= EMPTY ================= */}

      {!loading &&
        !error &&
        orders.length === 0 && (

          <div className='border rounded p-10 text-center'>

            <p className='text-gray-500 text-lg font-medium'>
              No Orders Found
            </p>

            <p className='text-gray-400 text-sm mt-1'>
              There are no orders available yet.
            </p>

          </div>

        )}


      {/* ================= ORDERS LIST ================= */}

      {!loading &&
        !error &&
        orders.length > 0 && (

          <div className='flex flex-col gap-2'>

            {orders.map((order, index) => (

              <div
                key={order._id || index}
                className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
              >

                {/* PARCEL ICON */}

                <img
                  className='w-12'
                  src={assets.parcel_icon}
                  alt='parcel'
                />


                {/* CUSTOMER + ADDRESS */}

                <div>

                  {/* ORDER ITEMS */}

                  <div>

                    {order.items.map((item, index) => (

                      <p
                        className='py-0.5'
                        key={index}
                      >

                        {item.name} x {item.quantity}{' '}

                        <span>
                          {item.size}
                        </span>

                        {index !== order.items.length - 1 && ','}

                      </p>

                    ))}

                  </div>


                  {/* CUSTOMER NAME */}

                  <p className='mt-3 mb-2 font-medium'>

                    {order.address.firstName}{' '}

                    {order.address.lastName}

                  </p>


                  {/* ADDRESS */}

                  <div>

                    <p>
                      {order.address.street},
                    </p>

                    <p>
                      {order.address.City},{' '}
                      {order.address.state},{' '}
                      {order.address.country},{' '}
                      {order.address.zipcode}
                    </p>

                  </div>


                  {/* PHONE */}

                  <p>
                    {order.address.phone}
                  </p>

                </div>


                {/* ORDER INFORMATION */}

                <div>

                  <p className='text-sm sm:text-[15px]'>
                    Items: {order.items.length}
                  </p>

                  <p className='mt-3'>
                    Method: {order.paymentMethod}
                  </p>

                  <p>
                    Payment: {order.payment ? 'Done' : 'Pending'}
                  </p>

                  <p>
                    Date:{' '}
                    {new Date(order.date).toLocaleDateString()}
                  </p>

                </div>


                {/* PRICE */}

                <p className='text-sm sm:text-[15px]'>

                  {currency}
                  {order.amount}

                </p>


                {/* STATUS */}

                <select
                  onChange={(event) =>
                    statusHandler(
                      event,
                      order._id
                    )
                  }
                  value={order.status}
                  className='font-semibold p-2 border border-gray-300 rounded'
                >

                  <option value='Order Placed'>
                    Order Placed
                  </option>

                  <option value='Packing'>
                    Packing
                  </option>

                  <option value='Shipped'>
                    Shipped
                  </option>

                  <option value='Out for delivery'>
                    Out for delivery
                  </option>

                  <option value='Delivered'>
                    Delivered
                  </option>

                </select>

              </div>

            ))}

          </div>

        )}

    </>

  )
}

export default Orders