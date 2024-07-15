import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

  return (
    <div className='w-full h-screen bg-primary_colors text-white flex flex-col items-center justify-center gap-5'>
        <h1 className='text-2xl'>404 Page Not Found !</h1>
        <h3 onClick={()=> navigate('/')} className='text-md cursor-pointer' >Back to Dashboard</h3>
    </div>
  )
}

export default NotFound