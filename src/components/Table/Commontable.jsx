import React, { useState } from "react";
import DateFormat from "../../utils/DateFormat";

import { useNavigate } from "react-router-dom";
import LoadingData from "../loading/LoadingData";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { deleteApplicationRoute } from "../../utils/Endpoint";
import DeleteApplication from "../modals/DeleteApplication";
import { FaRegEdit } from "react-icons/fa";
import PhaseChanger from "../modals/PhaseChanger";

const CommonTable = ({ data, page, entries, getData, isAdmin }) => {
  const user = useSelector((state) => state.auth.userInfo);
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [application, setApplication] = useState({})
  const navigate = useNavigate();

  const handleDelete = (data) => {
    // console.log("applictn Data", data)
    setApplication(data)
    setDeleteModal(true)
  }


  const handleEdit = (data) => {
    setApplication(data)
    setEditModal(true)
  }

  return (
    <div className="relative md:min-h-screen shadow-md md:rounded-lg overflow-x-scroll md:overflow-hidden mb-3 w-full">
      <table className="w-full  text-sm text-left ">
        <thead className="text-xs text-white uppercase bg ">
          <tr className="bg-primary_colors border-b  ">
            <th scope="row" className="px-6 py-4 font-bold">
              No.
            </th>
            <th className="px-6 py-4">Date Created</th>
            <th className="px-6 py-4">Student Name</th>
            <th className="px-6 py-4">Country</th>
            <th className="px-6 py-4">Intake</th>
            <th className="px-6 py-4">Application Status</th>
            <th className="px-6 py-4"> Assignee</th>

            <th className="px-6 py-4"> Actions </th>

            <th className="px-6 py-4"> View </th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((items, i) => (
              <tr
                key={items?._id}
                className="bg-white border-b  hover:bg-gray-50 text-black cursor-pointer capitalize"
              >
                <td className="px-6 py-4">{((page - 1) * entries) + i + 1}</td>
                <td className="px-6 py-4">{DateFormat(items?.createdAt ? items?.createdAt : "NIL")}</td>
                <td className="px-6 py-4">{items?.studentName ? items?.studentName : "NIL"}</td>
                <td className="px-6 py-4">{items?.country ? items?.country : "NIL"}</td>
                <td className="px-6 py-4 truncate">
                  {items?.intakes?.length > 0
                    ?
                    (items?.intakes?.length > 1
                      ?
                      items?.intakes[0] + " +more"
                      :
                      items?.intakes[0])
                    :
                    "NIL"

                  }
                </td>

                <td className="px-6 py-4">
                  {items?.statuses?.length > 0
                    ?
                    (items?.statuses?.length > 1
                      ?
                      items?.statuses[0] + " +more"
                      :
                      items?.statuses[0])
                    :
                    "NIL"
                  }
                </td>
                <td className="px-6 py-4">
                  {/* {items?.assignee ? items?.assigneeName : "NIL"} */}
                  {items?.assigneeNames?.length > 0
                    ?
                    (items?.assigneeNames?.length > 1
                      ?
                      items?.assigneeNames[0] + " +more"
                      :
                      items?.assigneeNames[0])
                    :
                    "NIL"
                  }
                </td>



                <td className="px-6 py-4 truncate">

                  <div className={`flex items-center ${isAdmin ? 'justify-between' : 'justify-center'} gap-3`}>
                    <FaRegEdit
                      onClick={() => handleEdit(items)}
                      size={23}
                      className="cursor-pointer hover:scale-105 ease-in-out duration-400"
                    />

                    {
                      isAdmin
                      &&
                      <MdDeleteOutline
                        onClick={() => handleDelete(items)}
                        size={23}
                        className="cursor-pointer hover:scale-105 ease-in-out duration-400 text-red-700"
                      />
                    }

                  </div>
                </td>


                <td className="px-6 py-4  t">
                  <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline-none hover:text-blue-800 hover:cursor-pointer">
                    <span
                      onClick={() =>
                        navigate(`/applications/stepper/${items?._id}`)
                      }
                    >
                      View

                    </span>
                  </div>
                </td>

              </tr>
            ))
          ) : (
            <div className="w-full top-40 absolute items-center justify-center">
              <LoadingData />
            </div>
          )}
        </tbody>
      </table>

      {editModal && <PhaseChanger data={application} setData={setApplication} getTableData={getData} setModal={setEditModal} />}

      {deleteModal && <DeleteApplication setModal={setDeleteModal} data={application} setData={setApplication} getTableData={getData} route={deleteApplicationRoute} />}

    </div>
  );
};

export default CommonTable;
