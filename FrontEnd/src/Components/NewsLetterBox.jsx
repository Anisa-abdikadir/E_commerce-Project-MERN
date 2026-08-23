import React from 'react'

const NewsLetterBox = () => {
    const onsubmitHandle =(event)=>{
        event.preventDefult();
    }
  return (
    <div className='text-center'>
            <p className=' text-gray-800 font-semibold text-2xl'>Subscribe now & get 20% off</p>
            <p className='text-gray-300 mt-3 '>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione soluta fugiat culpa sunt quo adipisci ullam sapiente dolor eum enim debitis</p>

                <form onSubmit={onsubmitHandle}  className='w-full items-center  sm:w-1/2 flex  gap-3 mx-auto mt-6 border pl-3'>
                    <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email ' required />

                    <button type='submit' className='bg-black text-white text-xs px-10 py-4 '>SUBSCRIBE</button>
                </form>

      
    </div>
  )
}

export default NewsLetterBox
