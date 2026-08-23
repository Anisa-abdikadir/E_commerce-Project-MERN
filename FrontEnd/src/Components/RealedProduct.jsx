import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "../Components/Title"
import ProductItems from "../Components/ProductItems"

const RealedProduct = ({categ,subcateg}) => {
    const{products}=useContext(ShopContext)
    const[related,setRelated]=useState([]);

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy= products.slice();
            productsCopy=productsCopy.filter((item)=> categ===item.categ);
            productsCopy=products.filter((item)=>subcateg===item.subcateg)
            setRelated (productsCopy.slice(0,5))
        }
    },[products])

  return (
    <div className="my-24">
        <div className="text-center text-3xl py-2">
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>

        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-col-5
        gap-4 gap-y-6 ">
            {
                related.map ((item,index)=>(
                    <ProductItems  key={index} id={item._id} 
                    name={item.name} image={item.image} price={item.price}
                    />
                ))
            }

        </div>
    </div>
  )
}
export default RealedProduct