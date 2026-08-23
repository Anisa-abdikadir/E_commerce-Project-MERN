import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Context/ShopContext"
import { assets } from "../assets/frontend_assets/assets"
import { useLocation } from "react-router-dom"
const SearchBar = () => {
      const{Search,setSearch,showSearch,setShowSerach}=useContext(ShopContext)
      const[visible,setvisible]=useState(false)
      const location =useLocation();

      useEffect(()=>{
        if(location.pathname.includes('Collection')&& showSearch){
          setvisible(true)
        }
        else{
          setvisible(false)
        }

      },[location])

  return showSearch  && visible ? (
    <div className="border-b border-t bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 pt-2
      my-5 mx-3 rounded-full w-3/4 sm:w-1/2">

        <input value={Search} onChange={(e)=>setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm" type="text" placeholder="Search" />\
        <img className="w-4" src={assets.search_icon} alt="" />

      </div>
      <img onClick={()=>setShowSerach(false)} className="inline w-3 cursor-pointer" src={assets.cross_icon} alt="" />

    </div>
  ):null
}
export default SearchBar