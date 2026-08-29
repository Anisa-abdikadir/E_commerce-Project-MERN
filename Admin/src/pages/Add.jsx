
import React, { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import axios from "axios"
import { backendUrl } from "../App"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

const Add = ({ token }) => {

  const { id } = useParams()
  const navigate = useNavigate()

  // UPDATE haddii id jiro
  const isEdit = Boolean(id)


  // IMAGES

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [oldImages, setOldImages] = useState([])


  // PRODUCT DATA

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [categ, setCateg] = useState("")
  const [subCateg, setSubcateg] = useState("")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSize] = useState([])


  // LOADING

  // Kaliya product-ka update mode lagu fetch-gareynayo
  const [fetchLoading, setFetchLoading] = useState(false)

  // Add / Update submit
  const [loading, setLoading] = useState(false)

  // Size error
  const [sizeError, setSizeError] = useState(false)


  // FETCH PRODUCT FOR UPDATE

  useEffect(() => {

    // Haddii /Add yahay
    // waxba ha fetch-gareyn
    if (!id) return

    const fetchProduct = async () => {

      try {

        setFetchLoading(true)

        const response = await axios.get(
          backendUrl + `/api/product/single/${id}`,
          {
            headers: {
              token: token
            }
          }
        )

        if (response.data.success) {

          const product = response.data.product


          setName(
            product.name || ""
          )


          setDescription(
            product.description || ""
          )


          setPrice(
            product.price || ""
          )


          setCateg(
            product.category || ""
          )


          setSubcateg(
            product.subCategory || ""
          )


          setSize(
            product.sizes || []
          )


          setBestseller(
            product.bestseller || false
          )


          setOldImages(
            product.image || []
          )

        } else {

          toast.error(
            response.data.message ||
            "Product not found"
          )

        }

      } catch (error) {

        console.log(error)

        toast.error(
          error.response?.data?.message ||
          "Failed to load product"
        )

      } finally {

        setFetchLoading(false)

      }

    }


    fetchProduct()

  }, [id, token])


  // SUBMIT ADD / UPDATE

  const onsubmitHandle = async (e) => {

    e.preventDefault()


    // ADD ONLY IMAGE REQUIRED

    if (
      !isEdit &&
      !image1 &&
      !image2 &&
      !image3 &&
      !image4
    ) {

      toast.error(
        "Please upload at least one product image"
      )

      return

    }


    // SIZE VALIDATION

    if (sizes.length === 0) {

      setSizeError(true)

      toast.error(
        "Please select at least one size"
      )

      return

    }

    setSizeError(false)


    try {

      setLoading(true)


      const formData = new FormData()


      // PRODUCT DATA

      formData.append(
        "name",
        name
      )


      formData.append(
        "description",
        description
      )


      formData.append(
        "price",
        price
      )


      formData.append(
        "category",
        categ
      )


      formData.append(
        "subCategory",
        subCateg
      )


      formData.append(
        "bestseller",
        bestseller
      )


      formData.append(
        "sizes",
        JSON.stringify(sizes)
      )


      // NEW IMAGES

      if (image1) {

        formData.append(
          "image1",
          image1
        )

      }


      if (image2) {

        formData.append(
          "image2",
          image2
        )

      }


      if (image3) {

        formData.append(
          "image3",
          image3
        )

      }


      if (image4) {

        formData.append(
          "image4",
          image4
        )

      }


      // UPDATE

      let response


      if (isEdit) {

        response = await axios.put(
          backendUrl +
          `/api/product/update/${id}`,
          formData,
          {
            headers: {
              token: token
            }
          }
        )

      }

      // ADD

      else {

        response = await axios.post(
          backendUrl +
          "/api/product/add",
          formData,
          {
            headers: {
              token: token
            }
          }
        )

      }


      // RESPONSE

      if (response.data.success) {

        toast.success(
          response.data.message
        )


        // UPDATE SUCCESS

        if (isEdit) {

          // Update kadib Add page caadi ah
          navigate("/Add")

          return

        }


        // =================================================
        // ADD SUCCESS
        // =================================================

        setName("")

        setDescription("")

        setPrice("")

        setCateg("")

        setSubcateg("")

        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

        setOldImages([])

        setSize([])

        setSizeError(false)

        setBestseller(false)

      } else {

        toast.error(
          response.data.message ||
          "Something went wrong"
        )

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      )

    } finally {

      setLoading(false)

    }

  }


  // FORM
  // 

  return (

    <form
      onSubmit={onsubmitHandle}
      className="flex flex-col w-full items-start gap-3"
    >


          {/* TITLE */}

      <h2 className="text-xl font-semibold mb-2">

        {isEdit
          ? "Update Product"
          : "Add Product"
        }

      </h2>


      {/* =================================================
          IMAGE
      ================================================= */}

      <div>

        <p className="mb-2">
          Upload Image
        </p>


        <div className="flex gap-2">


          {/* IMAGE 1 */}

          <label htmlFor="image1">

            <img
              className="w-20 cursor-pointer"
              src={
                image1
                  ? URL.createObjectURL(image1)
                  : oldImages[0] ||
                    assets.upload_area
              }
              alt=""
            />


            <input
              onChange={(e) =>
                setImage1(
                  e.target.files[0]
                )
              }
              type="file"
              id="image1"
              hidden
            />

          </label>


          {/* IMAGE 2 */}

          <label htmlFor="image2">

            <img
              className="w-20 cursor-pointer"
              src={
                image2
                  ? URL.createObjectURL(image2)
                  : oldImages[1] ||
                    assets.upload_area
              }
              alt=""
            />


            <input
              onChange={(e) =>
                setImage2(
                  e.target.files[0]
                )
              }
              type="file"
              id="image2"
              hidden
            />

          </label>


          {/* IMAGE 3 */}

          <label htmlFor="image3">

            <img
              className="w-20 cursor-pointer"
              src={
                image3
                  ? URL.createObjectURL(image3)
                  : oldImages[2] ||
                    assets.upload_area
              }
              alt=""
            />


            <input
              onChange={(e) =>
                setImage3(
                  e.target.files[0]
                )
              }
              type="file"
              id="image3"
              hidden
            />

          </label>


          {/* IMAGE 4 */}

          <label htmlFor="image4">

            <img
              className="w-20 cursor-pointer"
              src={
                image4
                  ? URL.createObjectURL(image4)
                  : oldImages[3] ||
                    assets.upload_area
              }
              alt=""
            />


            <input
              onChange={(e) =>
                setImage4(
                  e.target.files[0]
                )
              }
              type="file"
              id="image4"
              hidden
            />

          </label>

        </div>

      </div>


          {/* PRODUCT NAME */}

      <div className="w-full">

        <p className="mb-2">
          Product name
        </p>


        <input
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="type here"
          required
        />

      </div>


          {/* DESCRIPTION */}

      <div className="w-full">

        <p className="mb-2">
          Product description
        </p>


        <textarea
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="write content here"
          required
        />

      </div>


          {/* CATEGORY + SUBCATEGORY + PRICE */}

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">


        {/* CATEGORY */}

        <div>

          <p className="mb-2">
            Product Category
          </p>


          <select
            onChange={(e) =>
              setCateg(
                e.target.value
              )
            }
            value={categ}
            className="w-full px-3 py-2 cursor-pointer"
            required
          >

            <option value="">
              Select Category
            </option>

            <option value="Men">
              Men
            </option>

            <option value="Women">
              Women
            </option>

            <option value="Kids">
              Kids
            </option>

          </select>

        </div>


        {/* SUB CATEGORY */}

        <div>

          <p className="mb-2">
            Sub Category
          </p>


          <select
            onChange={(e) =>
              setSubcateg(
                e.target.value
              )
            }
            value={subCateg}
            className="w-full cursor-pointer px-3 py-2"
            required
          >

            <option value="">
              Select Sub Category
            </option>

            <option value="Topwear">
              Topwear
            </option>

            <option value="BottomWear">
              BottomWear
            </option>

            <option value="WinterWear">
              WinterWear
            </option>

          </select>

        </div>


        {/* PRICE */}

        <div>

          <p className="mb-2">
            Product price
          </p>


          <input
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            value={price}
            className="w-full px-3 py-2 cursor-pointer sm:w-[120px]"
            type="number"
            placeholder="25"
            required
          />

        </div>

      </div>


      {/* =================================================
          SIZES
      ================================================= */}

      <div>

        <p>
          Sizes
        </p>


        <div className="flex gap-3 mt-2">

          {[
            "S",
            "M",
            "L",
            "XL",
            "XXL"
          ].map((size) => (

            <div
              key={size}
              onClick={() => {

                setSize((prev) =>
                  prev.includes(size)
                    ? prev.filter(
                        item =>
                          item !== size
                      )
                    : [
                        ...prev,
                        size
                      ]
                )

                setSizeError(false)

              }}
            >

              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-pink-100"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >

                {size}

              </p>

            </div>

          ))}

        </div>


        {sizeError && (

          <p className="text-red-500 text-sm mt-2">

            Please select at least one size

          </p>

        )}

      </div>


          {/* BESTSELLER */}

      <div className="flex gap-2 mt-2">

        <input
          className="cursor-pointer"
          onChange={(e) =>
            setBestseller(
              e.target.checked
            )
          }
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />


        <label
          className="cursor-pointer"
          htmlFor="bestseller"
        >
          Add to bestseller
        </label>

      </div>


          {/* BUTTON */}

      <button
        type="submit"
        disabled={loading || fetchLoading}
        className={`w-28 py-2 mt-4 bg-black text-white ${
          loading || fetchLoading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >

        {loading
          ? isEdit
            ? "Updating..."
            : "Adding..."
          : isEdit
            ? "UPDATE"
            : "ADD"
        }

      </button>

    </form>

  )

}

export default Add