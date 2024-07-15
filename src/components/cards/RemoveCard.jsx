import React from 'react';
import { IoClose } from "react-icons/io5";

const RemoveCard = ({name,index, removeElement}) => {
  return (
    <div className='w-fit h-30px flex justify-center items-center p-1 gap-2 rounded-md border border-primary_colors'>
        <span>{name}</span>
        <span onClick={()=> removeElement(index)}
        className='cursor-pointer text-red-500'><IoClose/></span>
    </div>
  )
}

export default RemoveCard