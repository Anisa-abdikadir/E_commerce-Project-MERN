import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItems from './ProductItems';

const BestSeller = () => {
    const {products} =useContext(ShopContext);
    const [bestseller,setBestSeller]=useState([]);

    useEffect(() => {
  const bestProduct = products.filter(
    (item) => item.bestseller === true
  );

  setBestSeller(bestProduct.slice(0, 5));
}, [products]);


  return (
    <div className='my-10 '>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellendus quidem doloremque omnis numquam</p>

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestseller.map((item,index)=>(
                    <ProductItems key={index} id={item._id}
                     name={item.name} image={item.image} price={item.price}/>
                     
                ))
                  
            }
        </div>
      
    </div>
  )
}

export default BestSeller
