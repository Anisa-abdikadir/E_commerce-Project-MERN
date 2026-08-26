import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { FaTrash, FaEdit } from 'react-icons/fa'

const ProductDetails = ({ token }) => {

  const { id } = useParams()

  const navigate = useNavigate()

  const [product, setProduct] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [deleteLoading, setDeleteLoading] = useState(false)


  // ================= FETCH PRODUCT =================

  const fetchProduct = async () => {

    try {

      setLoading(true)
      setError(false)

      const response = await axios.get(
        backendUrl + `/api/product/single/${id}`,
        {
          headers: {
            token: token
          }
        }
      )

      if (response.data.success) {

        setProduct(response.data.product)

      } else {

        setError(true)

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)

      setError(true)

      toast.error(
        error.response?.data?.message ||
        "Server error. Please try again."
      )

    } finally {

      setLoading(false)

    }

  }


  useEffect(() => {

    if (token && id) {
      fetchProduct()
    }

  }, [token, id])


  // ================= DELETE =================

  const removeProduct = async () => {

    try {

      setDeleteLoading(true)

      const response = await axios.post(
        backendUrl + '/api/product/remove',
        {
          id: product._id
        },
        {
          headers: {
            token: token
          }
        }
      )

      if (response.data.success) {

        toast.success(response.data.message)

        setShowDeleteModal(false)

        navigate('/List')

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        "Failed to delete product"
      )

    } finally {

      setDeleteLoading(false)

    }

  }


  // ================= LOADING =================

  if (loading) {

    return (

      <div className='border rounded p-6 animate-pulse'>

        <div className='h-6 bg-gray-200 rounded w-40 mb-6'></div>

        <div className='flex flex-col md:flex-row gap-8'>

          <div className='w-full md:w-1/2'>

            <div className='w-full h-80 bg-gray-200 rounded'></div>

          </div>

          <div className='flex-1 space-y-5'>

            <div className='h-6 bg-gray-200 rounded w-60'></div>

            <div className='h-4 bg-gray-200 rounded w-full'></div>

            <div className='h-4 bg-gray-200 rounded w-5/6'></div>

            <div className='h-6 bg-gray-200 rounded w-32'></div>

            <div className='h-4 bg-gray-200 rounded w-40'></div>

          </div>

        </div>

      </div>

    )

  }


  // ================= ERROR =================

  if (error || !product) {

    return (

      <div className='border rounded p-10 text-center'>

        <p className='text-red-500 text-lg font-medium mb-2'>
          Product Not Found
        </p>

        <p className='text-gray-500 text-sm mb-5'>
          We couldn't load this product.
        </p>

        <button
          onClick={() => navigate('/List')}
          className='bg-black text-white px-5 py-2 rounded'
        >
          Back to Products
        </button>

      </div>

    )

  }


  // ================= PRODUCT DETAILS =================

  return (

    <div>

      {/* BACK */}

      <button
        onClick={() => navigate('/List')}
        className='mb-5 border px-4 py-2 rounded hover:bg-gray-100'
      >
        ← Back to Products
      </button>


      <div className='border bg-white rounded p-5'>

        {/* TITLE */}

        <h2 className='text-xl font-semibold mb-6'>
          Product Details
        </h2>


        <div className='flex flex-col md:flex-row gap-8'>


          {/* ================= IMAGES ================= */}

          <div className='w-full md:w-1/2'>

            <div className='grid grid-cols-2 gap-3'>

              {product.image?.map((image, index) => (

                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  className='w-full h-48 object-cover border rounded'
                />

              ))}

            </div>

          </div>


          {/* ================= INFORMATION ================= */}

          <div className='flex-1'>

            {/* NAME */}

            <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
              {product.name}
            </h1>


            {/* DESCRIPTION */}

            <div className='mb-5'>

              <p className='font-medium text-gray-700 mb-1'>
                Description
              </p>

              <p className='text-gray-500 leading-6'>
                {product.description}
              </p>

            </div>


            {/* PRICE */}

            <div className='mb-4'>

              <p className='font-medium text-gray-700'>
                Price
              </p>

              <p className='text-xl font-semibold text-gray-800'>
                {currency}{product.price}
              </p>

            </div>


            {/* CATEGORY */}

            <div className='grid grid-cols-2 gap-4 mb-4'>

              <div>

                <p className='font-medium text-gray-700'>
                  Category
                </p>

                <p className='text-gray-500'>
                  {product.category}
                </p>

              </div>


              <div>

                <p className='font-medium text-gray-700'>
                  Sub Category
                </p>

                <p className='text-gray-500'>
                  {product.subCategory}
                </p>

              </div>

            </div>


            {/* SIZES */}

            <div className='mb-5'>

              <p className='font-medium text-gray-700 mb-2'>
                Available Sizes
              </p>

              <div className='flex flex-wrap gap-2'>

                {product.sizes?.map((size, index) => (

                  <span
                    key={index}
                    className='border px-3 py-1 rounded text-sm'
                  >
                    {size}
                  </span>

                ))}

              </div>

            </div>


            {/* BESTSELLER */}

            <div className='mb-5'>

              <p className='font-medium text-gray-700'>
                Bestseller
              </p>

              <span
                className={`inline-block mt-1 px-3 py-1 rounded text-sm ${
                  product.bestseller
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {product.bestseller ? 'Yes' : 'No'}
              </span>

            </div>


            {/* PRODUCT ID */}

            <div className='mb-6'>

              <p className='font-medium text-gray-700'>
                Product ID
              </p>

              <p className='text-xs text-gray-400 break-all'>
                {product._id}
              </p>

            </div>


            {/* ================= ACTIONS ================= */}

            <div className='flex gap-3'>

              {/* UPDATE */}

              <button
                onClick={() =>
                  navigate(`/update/${product._id}`)
                }
                className='flex items-center gap-2 bg-black text-white px-5 py-2 rounded hover:bg-gray-800'
              >

                <FaEdit size={16} />

                Update

              </button>


              {/* DELETE */}

              <button
                onClick={() =>
                  setShowDeleteModal(true)
                }
                className='flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600'
              >

                <FaTrash size={16} />

                Delete

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* ================= DELETE MODAL ================= */}

      {showDeleteModal && (

        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>

          <div className='bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6'>


            {/* DELETE ICON */}

            <div className='flex justify-center mb-4'>

              <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>

                <FaTrash
                  className='text-red-500'
                  size={20}
                />

              </div>

            </div>


            {/* TITLE */}

            <h2 className='text-lg font-semibold text-center text-gray-800'>
              Delete Product?
            </h2>


            {/* MESSAGE */}

            <p className='text-sm text-gray-500 text-center mt-2'>
              Are you sure you want to delete this product?
              This action cannot be undone.
            </p>


            {/* BUTTONS */}

            <div className='flex justify-center gap-3 mt-6'>

              {/* CANCEL */}

              <button
                disabled={deleteLoading}
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className='px-5 py-2 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50'
              >
                Cancel
              </button>


              {/* DELETE */}

              <button
                disabled={deleteLoading}
                onClick={removeProduct}
                className='px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50'
              >

                {deleteLoading
                  ? "Deleting..."
                  : "Delete"
                }

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

export default ProductDetails