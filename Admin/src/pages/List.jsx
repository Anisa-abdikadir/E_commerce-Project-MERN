import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from "../App"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const List = ({ token }) => {

  const navigate = useNavigate()

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  const fetchList = async () => {

    try {

      setLoading(true)
      setError(false)

      const response = await axios.get(
        backendUrl + '/api/product/List',
        {
          headers: {
            token: token
          }
        }
      )

      if (response.data.success) {

        setTimeout(() => {

          setList(response.data.products)
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
        "Server error. Please try again."
      )

    }

  }


  useEffect(() => {

    if (token) {
      fetchList()
    }

  }, [token])


  return (
    <>

      <p className='mb-2'>
        All Product List
      </p>


          {/* LOADING */}

      {loading && (

        <div className='flex flex-col gap-2'>

          {/* Skeleton Header */}

          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm'>

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
              className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-2 border'
            >

              {/* IMAGE */}

              <div className='w-16 h-16 bg-gray-200 rounded animate-pulse'></div>


              {/* NAME */}

              <div className='h-4 w-32 bg-gray-200 rounded animate-pulse'></div>

              <div className='h-4 w-20 bg-gray-200 rounded animate-pulse'></div>

              <div className='h-4 w-16 bg-gray-200 rounded animate-pulse'></div>

              <div className='h-4 w-24 bg-gray-200 rounded animate-pulse'></div>

            </div>

          ))}

        </div>

      )}


          {/* ERROR */}

      {!loading && error && (

        <div className='border rounded p-8 text-center'>

          <p className='text-red-500 text-lg font-medium mb-2'>
            Something went wrong
          </p>

          <p className='text-gray-500 text-sm mb-4'>
            We couldn't load the products from the server.
          </p>

          <button
            onClick={fetchList}
            className='bg-black text-white px-5 py-2 rounded'
          >
            Try Again
          </button>

        </div>

      )}


          {/* EMPTY */}

      {!loading &&
        !error &&
        list.length === 0 && (

          <div className='border rounded p-10 text-center'>

            <p className='text-gray-500 text-lg font-medium'>
              No Products Found
            </p>

            <p className='text-gray-400 text-sm mt-1'>
              There are no products available yet.
            </p>

          </div>

        )}


          {/* PRODUCT LIST */}

      {!loading &&
        !error &&
        list.length > 0 && (

          <div className='flex flex-col gap-2'>


                {/* TABLE HEADER */}

            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>

              <b>Image</b>

              <b>Name</b>

              <b>Category</b>

              <b>Price</b>

              <b>Size</b>

            </div>


                {/* TABLE ROW */}

            {list.map((item, index) => (

              <div
                key={item._id || index}

                onClick={() =>
                  navigate(`/product/${item._id}`)
                }

                className='grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] items-center py-2 px-2 border text-sm cursor-pointer hover:bg-gray-100 transition'
              >
                    {/* IMAGE */}
                <img
                  className='w-16 h-16 object-cover rounded'
                  src={item.image?.[0]}
                  alt={item.name}
                />
                <p>
                  {item.name}
                </p>

                <p>
                  {item.category}
                </p>

                <p>
                  {currency}
                  {item.price}
                </p>

                <div className='flex flex-wrap gap-1'>

                  {item.sizes?.length > 0 ? (

                    item.sizes.map((size, sizeIndex) => (

                      <span
                        key={sizeIndex}
                        className='bg-slate-200 px-2 py-1 rounded text-xs'
                      >
                        {size}
                      </span>

                    ))

                  ) : (

                    <span className='text-gray-400'>
                      No size
                    </span>

                  )}

                </div>


              </div>

            ))}

          </div>

        )}

    </>
  )
}

export default List