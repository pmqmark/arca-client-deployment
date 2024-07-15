import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { addDataRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import RemoveCard from "../../components/cards/RemoveCard";
import { useDispatch, useSelector } from "react-redux";
import { setLeadSourceData } from "../../redux/slices/CommonDataReducer";


const AddLeadSourceModal = ({ setModal }) => {
    const dispatch = useDispatch();

    const axiosInstance = useAxiosPrivate();

    const leadsources = useSelector(state=> state.data.leadSources) || [];
  
    const [list, setList] = useState([...leadsources])
  
    const [chosen, setChosen] = useState("")
  
    const addElement = ()=>{
      if(!chosen.trim()){return} 
      
      setList((prev)=> ([...prev, chosen]))
      setChosen("")
    }
  
    const removeElement = (index)=>{
      const newList = list.filter((obj, i)=> i !== index)
      setList([...newList])
    }
  
    const handleSubmit = async () => {
      await axiosInstance.post(addDataRoute, { name: "leadSource", list: list })
        .then((res) => {
          toast.success("New Lead Source/s Added");
          dispatch(setLeadSourceData(res?.data?.list))
          setModal(false)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error?.response?.data?.msg)
        })
    }
  
    console.log("list", list)
  
    return (
      <div className="fixed top-0 left-0 w-full h-screen  bg-black/50 flex items-center justify-center z-50">
        <div className="relative bg-white mt-60  md:mt-0 md:w-1/2 rounded-lg p-5 md:p-10 m-5">
          <h1 className="font-bold text-center text-xl text-primary_colors">
            Add new Lead Source
          </h1>
          <IoClose
            onClick={() => setModal(false)}
            className="absolute right-3 top-3 rounded text-white cursor-pointer bg-primary_colors"
          />
          <div className="w-full h-[250px] flex flex-wrap items-center justify-start mt-5 gap-2">
  
            <div className="flex gap-4 md:gap-5 w-full">
              <div className="w-full gap-2 flex flex-col items-start">
                <label htmlFor="" className="text-sm font-semibold ">
                  Enter a Lead Source
                </label>
  
                <div className="w-full gap-2 flex items-start">
                  <input onChange={(e) => setChosen(e.target.value)}
                    value={chosen}
                    type="text"
                    name="leadSource"
                    className="w-full border border-gray-300 rounded text-sm p-2 focus:outline-none"
                  />
  
                  <button
                  onClick={addElement}
                  className="p-2 px-5 rounded text-sm text-white bg-primary_colors"
                  
                  >
                    Add
                  </button>
  
                </div>
  
                <div className="w-full h-[90px] overflow-y-scroll mt-5">
  
                    {
                      list.length > 0
                      &&
                      <div className="w-full flex flex-wrap gap-4">
                        {
                          list?.map((name, i)=>(
                            <RemoveCard name={name} index={i} removeElement={removeElement} />
                          ))
                        }
                      </div>
  
                    }
                </div>
  
  
  
              </div>
  
            </div>
  
            {/* button */}
            <div className="flex items-center justify-center gap-4 md:gap-9 w-full my-5">
              <button
                onClick={handleSubmit}
                type="submit"
                className="p-2 px-5 rounded text-sm text-white bg-primary_colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AddLeadSourceModal