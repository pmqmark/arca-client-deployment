import React, { useState } from "react";
import { FaExpandAlt } from "react-icons/fa";
import EmptyData from "../loading/EmptyData";
import Pagination from "../Pagination";
import SingleFollow from "../lead/SingleFollow";

const FollowTable = ({
  Cb,
  data,
  page,
  setEntries,
  setPage,
  entries,
}) => {
 
  const [followupModal, setFollowupModal] = useState(false);
  const [followData, setFollowData] = useState({});

  const getMethod = () => {
    Cb();
  };

  const HandleFollowup = (data) => {
    setFollowData(data)
    setFollowupModal(true);
  };

  
  return (
    <>
      <div className="relative md:h-full w-full shadow-md md:rounded-lg overflow-x-scroll md:overflow-hidden mb-3">
        <table className="w-full  text-sm text-left ">
          <thead className="text-xs text-white capitalize bg ">
            <tr className="bg-primary_colors border-b ">
              
              <th scope="row" className="px-3 py-4  text-white  font-bold">
                Sno.
              </th>
              <th className="px-3 py-4">Assignee</th>
              <th className="px-3 py-4">Follow up with</th>
              <th className="px-3 py-4">Due Date</th>
              <th className="px-3 py-4">Email</th>
              <th className="px-3 py-4">Phone Number</th>
              <th className="px-3 py-4 ">Status</th>
              <th className="px-3 py-4  t">
                <div className="font-bold text-white  hover:underline-none hover:text-blue-800 hover:cursor-pointer">
                  View
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((follow, i) => (
                <tr
                  key={i}
                  className="bg-white border-b  hover:bg-gray-50 text-black cursor-pointer text-xs"
                >
                  
                  <td className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {(page - 1) * entries + i + 1}
                  </td>
                  <td className="px-3 py-4 capitalize">
                    {follow?.assignee?.name ? follow?.assignee?.name : "NIL"}
                  </td>
                  <td className="px-3 py-4 capitalize">
                    {follow?.leadId?.name ? follow?.leadId?.name : "NIL"}
                  </td>
                  <td className="px-3 py-4">
                    {follow?.dueDate ? follow?.dueDate?.split("T")[0].split("-").reverse().join("/") : "NIL"}
                  </td>
                  <td className="px-3 py-4">
                    {follow?.leadId?.email ? follow?.leadId?.email : "NIL"}
                  </td>
                  <td className="px-3 py-4">
                    {follow?.leadId?.phone ? follow?.leadId?.phone : "NIL"}
                  </td>
                 
                  <td className={`px-3 py-4 capitalize `}>
                    <div
                      className={`p-2 px-4 flex justify-center items-center rounded-2xl text-xs  ${
                        follow?.status === "Completed"
                          ? "bg-green-100 border-2 border-green-500"
                          : follow?.status === "Overdue" 
                          ? "bg-red-100 border-2 border-red-500"
                          : "bg-yellow-100 border-2 border-yellow-500"
                      }`}
                    >
                      {follow?.status ? follow?.status : "NIL"}
                    </div>
                  </td>
                  <td className="px-3 py-4 ">
                      <FaExpandAlt
                        onClick={() => HandleFollowup(follow)}
                        size={18}
                        className="cursor-pointer hover:scale-105 ease-in-out duration-400 hover:text-primary_colors"
                      />
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
          getMethod={Cb}
        />
      </div>
      

      {followupModal && (
        <SingleFollow
          setModal={setFollowupModal}
          data={followData}
          getMethod={Cb}
        />
      )}

    
    </>
  );
};

export default FollowTable;
