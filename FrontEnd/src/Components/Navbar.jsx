import { useContext, useState } from "react"
import { assets } from "../assets/frontend_assets/assets"
import { Link, NavLink } from "react-router-dom"
import { ShopContext } from "../Context/ShopContext"
function Navbar() {
  const [visible, setvisible ]= useState(false );
  const{setShowSerach,getCartCount,navigate,token,setToken,setCartItem}=useContext(ShopContext);

  const logout = ()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItem({})
  }

  return (
    <div className="flex items-center justify-between  py-5 font-medium">
        <Link to='/'><img src={assets.logo} alt="" className="w-36" /></Link>

        <ul className=" hidden sm:flex gap-5 text-sm text-gray-700">

          <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr  className="w-2/4 border-none h-[1.5px] bg-bgprimary hidden" />

          </NavLink>

           <NavLink to='/Collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr  className="w-2/4 border-none h-[1.5px] bg-bgprimary hidden"/>

          </NavLink>

           <NavLink to='/About' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr  className="w-2/4 border-none h-[1.5px] bg-bgprimary hidden"/>

          </NavLink>

           <NavLink to='/Contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr  className="w-2/4 border-none h-[1.5px] bg-bgprimary hidden"/>

          </NavLink>

        </ul>

        <div className="flex items-center gap-6">
          <img onClick={()=>setShowSerach(true)} src={assets.search_icon} alt=""
          className="w-5 cursor-pointer" />
          
          <div className=" group relative">
           <img  onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer" alt="" />

           {/* hidden drop down when you whent to login */}
           {token &&
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">

                <p className="cursor-pointer hover:text-black">My profile</p>
                <p onClick={()=>navigate('/Orders')} className="cursor-pointer hover:text-black">Order</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>

              </div>
            </div>}
          </div>

          <Link to='/cart' className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className=" absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4
          bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
          </Link>
          <img onClick={()=>setvisible(true)} className="md:hidden"  src={assets.menu_icon} alt="" />
        </div>
        {/* sidebar */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>

          <div className=" flex flex-col text-gray-600">
            <div onClick={()=>setvisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
              <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
              <p>Back</p>

            </div>
            <NavLink onClick={()=>setvisible(false)} className="py-2 pl-6 border" to='/'>Home</NavLink>
            <NavLink onClick={()=>setvisible(false)} className="py-2 pl-6 border" to='/Collection'>Collection</NavLink>
            <NavLink onClick={()=>setvisible(false)} className="py-2 pl-6 border" to='/About'>About</NavLink>
            <NavLink onClick={()=>setvisible(false)} className="py-2 pl-6 border" to='/Contact'>Contact</NavLink>


          </div>

        </div>
      

    </div>
  )
}
export default Navbar