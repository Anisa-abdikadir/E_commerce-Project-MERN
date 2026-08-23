import BestSeller from "../Components/BestSeller"
import Hero from "../Components/Hero"
import LetestCollection from "../Components/LetestCollection"
import NewsLetterBox from "../Components/NewsLetterBox"
import OurPlocity from"../Components/OurPlocity"
function Home() {
  return (
    <div>
      <Hero/>
      <LetestCollection/>
      <BestSeller/>
      <OurPlocity/>
      <NewsLetterBox/>
    </div>
  )
}
export default Home