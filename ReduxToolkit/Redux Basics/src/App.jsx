import { useState } from "react"
import { useSelector } from "react-redux"
import data from "./cart.json"
import { Cart } from "./Cart";
import { CartCard } from "./CartCard";
function App() {
   const items=useSelector((state)=>state.cart);
  console.log(items)
   

  return (
    <>
    <div>
      <h1 className="text-orange-400 text-center font-semibold text-xl">Cart</h1>
      <div className="flex gap-3 justify-between items-center">
        {items.length==0?<h1 className="font-bold text-2xl text-center">Cart Empty</h1>:
        items.map((c)=><CartCard key={c.id} {...c}/>)}
      </div>
      <h2 className="mt-7 text-center text-orange-400 font-semibold text-xl">Shopping</h2>
      <div className="flex gap-3 justify-between items-center">
      {data.map((c)=><Cart key={c.id} {...c}/>)}
      </div>
    </div>
    </>
  )
}

export default App
