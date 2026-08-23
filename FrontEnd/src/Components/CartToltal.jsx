import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"

const CartToltal = () => {
    const{currency,delivery_fee,getCartAmount}=useContext(ShopContext);
  return (
    <div className="w-full">
        <div className="text-2xl">
            <p>Subtotal</p>
            <p>{currency}{getCartAmount()}.00</p>

        </div>
        <hr/>
        <div className="flex justify-between">
            <p>shipping fee </p>
            <p>{currency}{delivery_fee}.00</p>

        </div>
        <hr />
        <div className="flex justify-between">
            <b>Total</b>
            <b>{currency}{getCartAmount=== 0 ? 0 :getCartAmount() + delivery_fee}.00</b>

        </div>
        

        

    </div>
  )
}
export default CartToltal