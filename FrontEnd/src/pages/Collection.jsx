import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../Components/Title'
import ProductItems from '../Components/ProductItems'

const Collection = () => {
  const { products,Search,showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterproducts, setFilterproducts] = useState([])
  const [categ, setCateg] = useState([])
  const [subCateg, setSubCateg] = useState([])
  const[sortype,setsorttaype]=useState('relavent')

  // Category filter
  const toggleCateg = (e) => {
    const value = e.target.value

    if (categ.includes(value)) {
      setCateg((prev) => prev.filter((item) => item !== value))
    } else {
      setCateg((prev) => [...prev, value])
    }
  }

  // Sub category filter
  const toggleSubCateg = (e) => {
    const value = e.target.value

    if (subCateg.includes(value)) {
      setSubCateg((prev) => prev.filter((item) => item !== value))
    } else {
      setSubCateg((prev) => [...prev, value])
    }
  }

  // Apply filters
  const applyFilter = () => {
    let productsCopy = products.slice()

    if(showSearch && Search){
      productsCopy=productsCopy.filter((item)=>
      item.name.toLowerCase().includes(Search.toLowerCase()))
    }

    // Category
    if (categ.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        categ.includes(item.category)
      )
    }
  

    // Sub category
    if (subCateg.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCateg.includes(item.subCategory)
      )
    }

    setFilterproducts(productsCopy)
  }
const sortProduct = () => {
  let fpcopy = filterproducts.slice()

  switch (sortype) {
    case 'low-high':
      setFilterproducts(
        fpcopy.sort((a, b) => a.price - b.price)
      )
      break

    case 'high-low':
      setFilterproducts(
        fpcopy.sort((a, b) => b.price - a.price)
      )
      break

    default:
      applyFilter()
      break
  }
}
  // When products are loaded
  useEffect(() => {
    setFilterproducts(products)
  }, [products])

  // Apply filters whenever category changes
  useEffect(() => {
    applyFilter()
  }, [categ, subCateg,Search,showSearch,products])

  useEffect(()=>{
    sortProduct()

  },[sortype])

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">

      {/* Left side - Filters */}
      <div className="w-full sm:w-64">

        {/* Filter button */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="mt-2 items-center cursor-pointer flex gap-2 text-xl"
        >
          FILTERS

          <img
            className={`h-3 sm:hidden ${
              showFilter ? 'rotate-90' : ''
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">
            CATEGORY
          </p>

          <div className="flex flex-col gap-3 text-sm font-light text-gray-700">

            <p className="flex gap-2">
              <input
                className="w-3"type="checkbox" value="Men"onChange={toggleCateg}/>
              Men
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"type="checkbox"value="Women"onChange={toggleCateg}/>
              Women</p>

            <p className="flex gap-2">
              <input
                className="w-3"type="checkbox"value="Kids"onChange={toggleCateg}/>
              Kids</p>

          </div>
        </div>

        {/* Type filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? 'block' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">
            TYPE
          </p>

          <div className="flex flex-col gap-3 text-sm font-light text-gray-700">

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Topwear"
                onChange={toggleSubCateg}
              />
              Topwear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Bottomwear"
                onChange={toggleSubCateg}
              />
              Bottomwear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Winterwear"
                onChange={toggleSubCateg}
              />
              Winterwear
            </p>

          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">

        <div className="flex   justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="Collections" />

          {/* Product sort */}
          <select onChange={(e)=>setsorttaype(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">
              Sort by: Relevant
            </option>

            <option value="low-high">
              Sort by: Low to High
            </option>

            <option value="high-low">
              Sort by: High to Low
            </option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

          {filterproducts.map((item, index) => (
            <ProductItems
              key={index}
              name={item.name}
              price={item.price}
              id={item._id || item.id}
              image={item.image}
            />
          ))}

        </div>
      </div>
    </div>
  )
}

export default Collection