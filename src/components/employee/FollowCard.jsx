import React from 'react'

const FollowCard = ({data}) => {
  return (
    <div className='bg-white w-full flex flex-col md:flex-row rounded-md'>
        <div className='w-full md:w-1/2 flex flex-col gap-1 p-4 border border-red-500'>
            <p><span className='font-bold'>Follow up</span> - with {data?.leadId?.name} </p>
            <p><span className='font-bold'>Due Date</span>: {data?.dueDate?.split("T")[0].split("-").reverse().join("/")} </p>
            <p><span className='font-bold'>Status</span>: {data?.status} </p>
            {
                !data?.isCompleted
                &&
                <div className='w-fit flex items-center p-2 gap-3 border border-primary_colors rounded-lg'>
                    <span className='font-bold'>Mark as Complete</span>
                <input
                type='checkbox'
                className='cursor-pointer'
                />
                </div>
            }

        </div>

        <div className='w-full md:w-1/2  flex flex-col p-4 border border-green-500'>
            <p><span className='font-bold'>Note</span> - {data?.note} </p>
        </div>
    </div>
  )
}

export default FollowCard