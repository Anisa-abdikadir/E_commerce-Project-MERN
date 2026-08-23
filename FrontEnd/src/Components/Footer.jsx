import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  my-10 mt-40 gap-14">

      <div>
        <img src={assets.logo} alt=""  className="mb-5 w-32" />
      

        <p className="w-full md:w-2/3 text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Quaerat, harum nesciunt tenetur quo numquam
          quibusdam cupiditate id exercitationem quia consectetur
          accusantium iusto delectus corporis laboriosam minus
          nulla voluptatibus saepe velit.
        </p>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>

        <ul className="flex flex-col gap-1 text-gray-600">
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>DELIVERY</li>
          <li>PRIVACY</li>
        </ul>
      </div>

       <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+1-212-456-7890</li>
          <li>greatstackdev@gmail.com</li>
          
        </ul>
      </div>
    </div>
    <div>
        <hr/>
        <p className='py-5 text-sm text-center' >Copy Right 2026@ forever.com -All Right Reserved</p>
    </div>
    </div>
  );
};

export default Footer
