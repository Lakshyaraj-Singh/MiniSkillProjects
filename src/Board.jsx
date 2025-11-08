import { useEffect, useState } from "react"
import { data } from "./data";
export const Board = () => {
  return (
    <div className="flex justify-between item-center h-full w-full">
        <div className="w-full mt-10  flex  gap-3 justify-center ">
          <Columns title="todo" headingColor={"text-yellow-300"} cards={data}/>
          <Columns title="inProgress" headingColor={"text-blue-300"} cards={data}/>
          <Columns title="done" headingColor={"text-orange-500"} cards={data}/>

        </div>
    </div>
  )
}

const Columns=({title,headingColor,cards})=>{
   
  const [active,setActive]=useState(false);
  const [filterCards,setFilterCards]=useState(null);
  useEffect(() => {
    const loadCards=() =>{
     let filteredCard=cards.filter((c)=>c.column===title);
    setFilterCards(filteredCard);
   }
  loadCards()
    
  }, [])
  
 
  return (
    <>
    <div  className="w-96 rounded p-1   bg-neutral-700/20">
       <div className="flex gap-3 items-center text-xl"><h1 className={`${headingColor} font-bold text-center capitalize `}>{title}</h1> <span className="bg-neutral-200/70 rounded-xl h-5 text-sm px-4 font-semibold">{filterCards?.length}</span></div>
       <div className="flex flex-col gap-1.5 mt-5  ">
             {filterCards?.map((c)=>
             <Cards key={c.id} {...c}/>

            )}
       </div>

    </div>
    </>
  )

}

const Cards=({title,id,column})=>{
  const [active,setActive]=useState(false);
  const handleDragStart=(e)=>{
   
    
    e.dataTransfer.setData("cardId",id)
    
    setActive(true)
    }
   

  
  return(<>
  
  <div draggable="true" onDrag={(e)=>e.preventDefault()} onDragEnd={()=>{setActive(false)}} onDragStart={handleDragStart}  className={`w-full cursor-grab !opacity-100 ${active?"bg-red-500":"bg-neutral-700"}   active:cursor-grabbing p-2 rounded-md border-neutral-100/20 border-2 `}>
      <h1 className="text-gray-100">{title}</h1>

  </div>
  </>)
  }
