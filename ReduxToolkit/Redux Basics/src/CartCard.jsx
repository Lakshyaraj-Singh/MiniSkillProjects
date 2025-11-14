import { useDispatch } from "react-redux"
import { addItems } from "./Store/cartSlice";

export const CartCard = ({id,title,description ,price}) => {
    const dipatch=useDispatch();
  return <>
  <div  className="card bg-base-100 w-60 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{description}</p>
    <p>{price}</p>
    <div className="card-actions justify-end">
      <button  className="btn bg-orange-500">Finish Buying</button>
    </div>
  </div>
</div>
  </>
    
  
}