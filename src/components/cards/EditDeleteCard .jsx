import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import DeleteAlert from '../alerts/DeleteAlert';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { officeAdminRoute } from '../../utils/Endpoint';
import { toast } from 'react-toastify';
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { setOfficeDatas } from '../../redux/slices/CommonDataReducer';

const EditDeleteCard = ({item, data, setData}) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(item?.name);
  const dispatch = useDispatch()


  const axiosInstance = useAxiosPrivate();

  const handleDelete = async()=>{
    try {
      const res = await axiosInstance.delete(`${officeAdminRoute}/${item?._id}`)

      if(res.status === 200){
        
        toast.success('Office deleted')

        const deletedOffice = res?.data?.office;
        console.log({deletedOffice})

        const newData = data?.filter((elem,i)=> elem?._id !== deletedOffice?._id)

        setData([...newData])

        dispatch(setOfficeDatas([...newData]))

        setDeleteAlert(false)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete')
    }
  }

  const cancelEdit = ()=>{
    setEditMode(false)
    setName(item?.name)
  }

  const handleEdit = async()=>{
    try {
      if(!name?.trim()) return;

      if(name === item?.name) return;

      const res = await axiosInstance.put(`${officeAdminRoute}/${item?._id}`,
        {name: name}
      )

      if(res.status === 200){
        toast.success('Office Updated')
        const updatedOffice = res?.data?.office;

        const newData = data?.map((elem,i)=>{
          if(elem?._id === item?._id){
            elem.name = updatedOffice?.name
          }
          return elem
        })

        setData([...newData])
        dispatch(setOfficeDatas([...newData]))

        setEditMode(false)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Failed to Update')
    }
  }

  return (
    <div className='w-full h-[50px] flex justify-around items-center gap-2 rounded-md border border-primary_colors'>
      
        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        disabled={!editMode}
        className='w-1/2 px-2 flex items-center rounded outline-none border border-dotted border-primary_colors'
        />

        {
          editMode
          ?
          <div className='flex items-center gap-2'>
            <span onClick={cancelEdit}
          className='cursor-pointer'><IoClose size={22} /></span>
          <span onClick={handleEdit}
          className='cursor-pointer '><TiTick size={22} /></span>
          </div>
          :
        <div className='flex items-center gap-4'>
          <span onClick={()=> setDeleteAlert(true)}
          className='cursor-pointer text-red-500'><FaTrashCan/></span>
          <span onClick={()=> setEditMode(true)}
          className='cursor-pointer text-blue-500'><FaRegEdit/></span>

        </div>

        }

        {
          deleteAlert
          &&
          <DeleteAlert onConfirm={handleDelete} onCancel={()=> setDeleteAlert(false)} name='office' />
        }
    </div>
  )
}

export default EditDeleteCard