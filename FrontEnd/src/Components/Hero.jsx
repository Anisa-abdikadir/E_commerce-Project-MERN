import { assets } from "../assets/frontend_assets/assets"

function Hero() {
  return (
    <div className="flex flex-col  sm:flex-row border border-gray-400 ">

        {/* Hero Left side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
            <div className="flex gap-2  items-center">
                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>

                <p className="font-medium text-sm md:text-base">Our Besrseles</p>

            </div>
            <h1 className=" prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed ">Letst Arrivers</h1>
            <div className="flex gap-2 items-center">
                <p className="font-semibold text-sm md:text-base">Shop now</p>
                <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>

            </div>

        </div>

        </div>

        {/* Right side */}
        <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />

    </div>
  )
}
export default Hero