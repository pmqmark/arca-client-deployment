import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineMessage } from "react-icons/md";
import EmptyData from "../loading/EmptyData";
import Pagination from "../Pagination";
import EditLeadData from "../lead/EditLeadData";
import DeleteAlert from "../DeleteAlert";
import FollowupBox from "../lead/FollowupBox";
import { RiChatFollowUpFill } from "react-icons/ri";

const LeadTable = ({
  Cb,
  data,
  isSuperior,
  isAdmin,
  page,
  setPage,
  entries,
  setEntries,
  setFormData,
  selectedRows,
  setSelectedRows, allSelected, setAllSelected
}) => {
  const [leadData, setLeadData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [followupModal, setFollowupModal] = useState(false);

  // const [allSelected, setAllSelected] = useState(false);

  const handleDelete = (data) => {
    setLeadData(data);
    setDeleteModal(true);
  };

  const handleEdit = (data) => {
    setLeadData(data);
    setEditModal(true);
  };

  const getMethod = () => {
    Cb();
  };

  const HandleFollowup = (data) => {
    setLeadData(data);
    setFollowupModal(true);
  };

  // Row Selection 
  const handleRowSelect = (lead) => {
    console.log(lead)
    if (selectedRows.includes(lead)) {
      const updatedRows = selectedRows.filter((row) => row !== lead);
      setSelectedRows(updatedRows);
      // set data to the parent variable
      setFormData(updatedRows);
    } else {
      setSelectedRows([...selectedRows, lead]);
      // set data to the parent variable
      setFormData([...selectedRows, lead]);
    }
  };

  const selectAllRows = ()=>{
    if(allSelected){
      setAllSelected(false)
      setSelectedRows([])
      setFormData([])
    }
    else{
      setAllSelected(true)
      const liveIds = data?.map((item)=> item?._id)
      setSelectedRows([...liveIds])
      setFormData([...liveIds])
    }
  }


  return (
    <>
      <div className="relative md:h-full w-full shadow-md md:rounded-lg overflow-x-scroll md:overflow-hidden mb-3">
        <table className="w-full  text-sm text-left ">
          <thead className="text-xs text-white capitalize bg ">
            <tr className="bg-primary_colors border-b ">
              {isSuperior && (
                // <th scope="row" className="px-4 py-4  text-white  font-bold">
                //   select
                // </th>

                <th scope="row" className="px-4 py-4  text-white  font-bold">

                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={selectAllRows}
                    className="cursor-pointer"
                  />
                </th>
              )}
              <th scope="row" className="px-4 py-4  text-white  font-bold">
                Sno.
              </th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Phone</th>
              {isSuperior && <th className="px-4 py-4 ">Assignee</th>}
              <th className="px-4 py-4 ">Status</th>
              <th className="px-4 py-4 ">Created Date</th>
              <th className="px-4 py-4  t">
                <div className="font-bold text-white  hover:underline-none hover:text-blue-800 hover:cursor-pointer">
                  Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((lead, i) => (
                <tr
                  key={i}
                  className="bg-white border-b  hover:bg-gray-50 text-black cursor-pointer text-xs"
                >
                  {isSuperior && (
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(lead?._id)}
                        onChange={() => handleRowSelect(lead?._id)}
                      />
                    </td>
                  )}
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {(page - 1) * entries + i + 1}
                  </td>
                  <td className="px-4 py-4 capitalize">
                    {lead?.name ? lead?.name : "NIL"}
                  </td>
                  <td className="px-4 py-4">
                    {lead?.email ? lead?.email : "NIL"}
                  </td>
                  <td className="px-4 py-4">
                    {lead?.phone ? lead?.phone : "NIL"}
                  </td>
                  {isSuperior && (
                    <td className="px-4 py-4 capitalize">
                      {lead?.assignee?.name ? lead?.assignee?.name : "NIL"}
                    </td>
                  )}
                  <td className={`px-4 py-4 capitalize `}>
                    <div
                      className={`p-2 px-4 flex justify-center items-center rounded-2xl text-xs  ${lead?.status === "Untouched"
                          ? "bg-yellow-100 border-2 border-yellow-500"
                          : lead?.status === "Converted"
                            ? "bg-green-100 border-2 border-green-500"
                            : lead?.status === "Warm"
                              ? "bg-orange-100 border-2 border-orange-500"
                              : lead?.status === "Hot"
                                ? "bg-orange-400 border-2 border-red-600"
                                : "bg-red-100 border-2 border-red-500"
                        }`}
                    >
                      {lead?.status ? lead?.status : "NIL"}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {lead?.createdAt ? lead?.createdAt?.split("T")[0] : "NIL"}
                  </td>
                  <td className="px-4 py-4 ">
                    <div className="flex items-center justify-between gap-2">
                      <FaRegEdit
                        onClick={() => handleEdit(lead)}
                        size={18}
                        className="cursor-pointer hover:scale-105 ease-in-out duration-400 hover:text-primary_colors"
                      />
                      <RiChatFollowUpFill
                        onClick={() => HandleFollowup(lead)}
                        size={18}
                        className="cursor-pointer hover:scale-105 ease-in-out duration-400 hover:text-primary_colors"
                      />

                      {
                        isAdmin
                        &&
                        <MdDeleteOutline
                          onClick={() => handleDelete(lead)}
                          size={18}
                          className="cursor-pointer hover:scale-105 ease-in-out duration-400 hover:text-red-700"
                        />
                      }

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b  hover:bg-gray-50 text-black cursor-pointer">
                <div className="w-full h-full absolute justify-center">
                  <EmptyData data={"No Available Data "} />
                </div>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Pagination
          dataLength={data?.length}
          page={page}
          setPage={setPage}
          entries={entries}
          setEntries={setEntries}
          getMethod={getMethod}
        />
      </div>
      {editModal && (
        <EditLeadData
          setModal={setEditModal}
          data={leadData}
          getMethod={getMethod}
          isSuperior={isSuperior}
        />
      )}

      {followupModal && (
        <FollowupBox
          setModal={setFollowupModal}
          data={leadData}
          getMethod={getMethod}
        />
      )}

      {deleteModal && (
        <DeleteAlert
          setModal={setDeleteModal}
          data={leadData}
          getMethod={getMethod}
        />
      )}
    </>
  );
};

export default LeadTable;
