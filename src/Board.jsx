import { useEffect, useState } from "react"
import { data } from "./data";
export const Board = () => {
  return (
    <div className="flex justify-between item-center h-full w-full">
        <div className="w-full mt-10  flex  gap-3 justify-center items-center ">
          <Columns title="todo" headingColor={"bg-neutral-yellow-300"} cards={data}/>
          <Columns title="inProgress" headingColor={"bg-neutral-blue-300"} cards={data}/>
          <Columns title="done" headingColor={"bg-neutral-orange-500"} cards={data}/>

        </div>
    </div>
  )
}

const Columns=({title,headingColor,cards})=>{
   
  let [active,setActive]=useState(false);
  let [filterCards,setFilterCards]=useState(null);
  let filteredCard=cards.filter((c)=>c.column===title);
  useEffect(() => {
   const loadCards=() =>{
    setFilterCards(filteredCard);
   }
  loadCards()
    
  }, [])
  
 
  return (
    <>
    <div className="w-96  bg-red-300 flex flex-column gap-1.5 bg-neutral-500/20">
       <div><h1></h1></div>

    </div>
    </>
  )

}
