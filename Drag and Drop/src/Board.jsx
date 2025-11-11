import { useEffect, useState } from "react"
import { data } from "./data";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { motion } from "motion/react"
export const Board = () => {
  
   const [tasks,setTasks]=useState(()=> {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : data;
  })
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="flex justify-between item-center h-screen w-full">
        <div className="w-full mt-10 h-full flex  gap-3 justify-center ">
          <Columns title="todo" headingColor={"text-yellow-300"} setTasks={setTasks} cards={tasks}/>
          <Columns title="inProgress" headingColor={"text-blue-300"}setTasks={setTasks} cards={tasks}/>
          <Columns title="done" headingColor={"text-orange-500"} setTasks={setTasks} cards={tasks}/>
          <DeleteFire setTasks={setTasks}/>
        </div>
    </div>
  )
}

const Columns=({title,headingColor,cards,setTasks})=>{
   
  const [active,setActive]=useState(false);
  const [addActive,setAddActive]=useState(false);
  const [filterCards,setFilterCards]=useState(null);
  useEffect(() => {
    const loadCards=() =>{
     let filteredCard=cards.filter((c)=>c.column===title);
    setFilterCards(filteredCard);
   }
  loadCards()
    
  }, [cards,title])
  const handleDragStart=(e,card)=>{
   
    
    e.dataTransfer.setData("cardId",card.id)
    setActive(false)
    
    }
    const handleDragLeave = () => {
      setActive(false);
    }
    const handleDragOver=(e)=>{
      e.preventDefault();
      setActive(true)
      
    }
    const handleDragend=(e)=>{
      const cardId = e.dataTransfer.getData("cardId");
      setActive(false);
      setTasks((pv)=>pv.map(task=>task.id === cardId ? { ...task, column: title } : task)) 
      
    }

  
  
 
  return (
    <>
    <motion.div layout  onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDragend} className={`w-96 rounded  p-1 ${active?"bg-neutral-100":"bg-neutral-700/0"}  `}>
       <div className="flex gap-3 items-center text-xl"><h1 className={`${headingColor} font-bold text-center capitalize `}>{title}</h1> <span className="bg-neutral-200/70 rounded-xl h-5 text-sm px-4 font-semibold">{filterCards?.length}</span></div>
       <div className="flex flex-col gap-1.5 mt-5  ">
             {filterCards?.map((c)=>
             <Cards handleDragStart={handleDragStart} key={c.id} {...c}/>

            )}
       </div>
      
       <AddTask column={title} setTasks={setTasks} addActive={addActive} setAddActive={setAddActive}/>
       
      

    </motion.div>
    </>
  )

}

const Cards=({title,id,column,handleDragStart})=>{
  const [active,setActive]=useState(false);
  
   

  
  return(<>
  
  <motion.div layout layoutId={id} draggable="true" onDragStart={(e)=>handleDragStart(e,{title,id,column})}  className={`w-full cursor-grab !opacity-100 ${active?"bg-red-500":"bg-neutral-700"}   active:cursor-grabbing p-2 rounded-md border-neutral-100/20 border-2 `}>
      <h1 className="text-gray-100">{title}</h1>

  </motion.div>
  </>)
  }

const DeleteFire=({setTasks})=>{

  const [active,setActive]=useState(false);
  const handleDragEnter = (e) => {
    e.preventDefault();
    setActive(true); 
  }
  const handleDragOver = (e) => {
    e.preventDefault(); 
  }
  const handleDragLeave = (e) => {
    setActive(false); 
  }
  const handleDrop = (e) => {
    setActive(false); 
    const cardId = e.dataTransfer.getData("cardId");
   setTasks((pv)=>pv.filter(c=>c.id!==cardId))
  }
  
  return<>
   <div onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave} onDragEnter={handleDragEnter} className={`h-96 w-96  rounded-lg flex justify-center border-2 items-center ${active?"[&>.child]:animate-bounce border-red-500/70 text-red-500 bg-red-500/10  ":"border-red-500/0  text-red-500/60 bg-neutral-700/30 "}`}>
   <LocalFireDepartmentIcon  className="child" style={{ width: 50, height: 50 }}  />
   </div>
   
   </>
}


const AddTask=({setTasks,addActive,setAddActive,column})=>{
  const [task,setTask]=useState({title:""});
  const handleChange=(e)=>{
    setTask({...task,[e.target.name]:e.target.value})
  }
  const handleOnSubmit=(e)=>{
   e.preventDefault();
   setTasks((pv)=>[...pv,{id:Math.random().toString(36).substring(2, 11),title:task.title,column:column}])
   setTask({ title: "" }); 
   setAddActive(false); 
  }
  return<>
  <motion.form layout  onSubmit={handleOnSubmit}
       >
  {!addActive?<button onClick={()=>{setAddActive(true)}} className="btn transition-all ease-in-out border-1 mt-2 cursor-pointer rounded-md border-neutral-100/70 text-neutral-100/60 hover:bg-neutral-100/90   hover:text-neutral-800 p-1.5 ">Add tasks</button>
       :<div className="mt-2 ">
         <textarea name="title" onChange={handleChange} value={task.title} className="w-full bg-violet-300/30   focus:outline-0 text-neutral-50 placeholder-violet-300  rounded-md border-1 border-violet-300"  id=""></textarea>
         <div className="flex gap-3 justify-end">
          <button type="submit" className=" cursor-pointer bg-neutral-100/90 rounded-md   text-neutral-800 px-1.5 py-1">Add task</button>
          <button onClick={()=>setAddActive(false)} className="  cursor-pointer text-neutral-50 border-1 border-neutral-100/50 px-1.5 py-1 rounded-md">Close</button>
         </div>
       </div>}
       </motion.form>
  </>
}