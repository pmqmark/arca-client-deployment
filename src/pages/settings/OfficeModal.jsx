import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { officeAdminRoute, officeCommonRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EditDeleteCard from "../../components/cards/EditDeleteCard ";
import { useDispatch } from "react-redux";
import { setOfficeDatas } from "../../redux/slices/CommonDataReducer";


const OfficeModal = ({ setModal }) => {
    const axiosInstance = useAxiosPrivate();
    const dispatch = useDispatch()
  
    const [offices, setOffices] = useState([])
    const [office, setOffice] = useState('')

    const fetchData = async()=>{
      try {
        const res = await axiosInstance.get(officeCommonRoute)

        if(res.status === 200){
          const data = res?.data?.office;
          setOffices([...data])
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    const removeElement = (index)=>{
      const newoffices = offices.filter((obj, i)=> i !== index)
      setOffices([...newoffices])
    }
  
    const addElement = async () => {
      try {
        const res = await axiosInstance.post(officeAdminRoute, { name: office });

        if(res.status === 200){
          toast.success("New office added");
          const newOffice = res?.data?.office;
          setOffices((prev)=>([newOffice, ...prev]))
          setOffice('')
          
          dispatch(setOfficeDatas([newOffice, ...offices]))
        }

      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.msg)
        
      }
        
    }

    useEffect(()=>{
        fetchData()
    },[])
  
    console.log("offices", offices)
  
    return (
      <div className="fixed top-0 left-0 w-full h-screen  bg-black/50 flex items-center justify-center z-50">
        <div className="relative bg-white mt-20  md:mt-0 md:w-1/3 rounded-lg p-5 md:p-10 m-5">
          <h1 className="font-bold text-center text-xl text-primary_colors">
            Add/Edit Office
          </h1>
          <IoClose
            onClick={() => setModal(false)}
            className="absolute right-3 top-3 rounded text-white cursor-pointer bg-primary_colors"
          />
          <div className="w-full h-[330px] flex flex-wrap items-center justify-start mt-2 gap-2">
  
            <div className="flex gap-4 md:gap-5 w-full">
              <div className="w-full gap-2 flex flex-col items-start">
                <label htmlFor="" className="text-sm font-semibold ">
                  Enter new Office
                </label>
  
                <div className="w-full gap-2 flex items-start">
                  <input onChange={(e) => setOffice(e.target.value)}
                    value={office}
                    type="text"
                    name="office"
                    className="w-full border border-gray-300 rounded text-sm p-2 focus:outline-none"
                  />
  
                  <button
                  onClick={addElement}
                  className="p-2 px-5 rounded text-sm text-white bg-primary_colors"
                  
                  >
                    Add
                  </button>
  
                </div>
  
                <div className="w-full h-[200px] overflow-y-scroll mt-5">
  
                    {
                      offices.length > 0
                      &&
                      <div className="w-full flex flex-wrap gap-4">
                        {
                          offices?.map((item, i)=>(
                            <EditDeleteCard key={item?._id} item={item}
                            data={offices} setData={setOffices}
                            />
                          ))
                        }
                      </div>
  
                    }
                </div>
  
  
  
              </div>
  
            </div>
  
           
          </div>
        </div>
      </div>
    )
}

export default OfficeModal