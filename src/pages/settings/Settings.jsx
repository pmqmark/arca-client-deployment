import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import AddLeadSourceModal from './AddLeadSourceModal';
import OfficeModal from './OfficeModal';

const Settings = () => {
    const [leadSourceModal , setLeadSourceModal] = useState(false)
    const [officeModal , setOfficeModal] = useState(false)

    return (
        <div className="container mx-auto w-full h-full  pt-10 pb-28">
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-primary_colors font-bold md:text-2xl mb-6 mt-3">
                    Settings
                </h1>
            </div>

            <div className=" flex w-full flex-wrap items-center gap-5">

                <div className="flex w-full md:w-[290px] justify-around items-center bg-white text-primary_colors p-5  py-7 rounded-lg shadow-xl">
                    <h1 onClick={()=> setLeadSourceModal(true)}
                    className="font-bold flex items-center justify-center gap-2 cursor-pointer">
                        Add new Lead Source
                        <IoIosAddCircle />
                    </h1>
                </div>

                <div className="flex w-full md:w-[290px] justify-around items-center bg-white text-primary_colors p-5  py-7 rounded-lg shadow-xl">
                    <h1 onClick={()=> setOfficeModal(true)}
                    className="font-bold flex items-center justify-center gap-2 cursor-pointer">
                        Add/Edit Office
                        <IoIosAddCircle />
                    </h1>
                </div>


            </div>


            {
               leadSourceModal
                &&
                <AddLeadSourceModal
                    setModal={setLeadSourceModal}
                />
            }

            {
                officeModal
                &&
                <OfficeModal setModal={setOfficeModal} />
            }

        </div>
    )
}

export default Settings