import React from 'react'

export default function ButtomCustom({onClick,text,flag}) {
  return (
    <>
 {  
 flag? 
 <div onClick={onClick}  className=" text-[12px] w-[155px] max-w-[200px] h-[70px] ml-auto mr-auto  cursor-pointer relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-800 rounded group-hover:-mr-4 group-hover:-mt-4">
    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
    </span>
   
     <span className="absolute bottom-0 left-0 w-full h-full transition-all
      duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
  

    <span className=" flex justify-center relative w-full text-left  uppercase text-white transition-colors duration-200 ease-in-out group-hover:text-white">
        
       {text}
       </span>
    </div>
  :
  <div onClick={onClick}  className=" max-w-[200px]  ml-auto mr-auto  cursor-pointer relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-rose-400 rounded-xl group">
  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-800 rounded group-hover:-mr-4 group-hover:-mt-4">
  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
  </span>
 
   <span className="absolute bottom-0 left-0 w-full h-full transition-all
    duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>


  <span className=" flex justify-center relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
      
     {text}
     </span>
  </div>
  }
    </>

  )
}
