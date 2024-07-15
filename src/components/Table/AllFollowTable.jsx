import React, { useState } from "react";
import EmptyData from "../loading/EmptyData";
import Pagination from "../Pagination";

const AllFollowTable = ({
  Cb,
  data,
  page,
  setPage,
  entries,
  setEntries,
}) => {

  const getMethod = () => {
    Cb();
  };

  return (
    <>
      <div className="relative md:h-full w-full shadow-md md:rounded-lg overflow-x-scroll md:overflow-hidden mb-3">
        <table className="w-full  text-sm text-left ">
          <thead className="text-xs text-white capitalize bg ">
            <tr className="bg-primary_colors border-b ">

              <th scope="row" className="px-6 py-4  text-white  font-bold">
                Sno.
              </th>
              <th className="px-6 py-4">Assignee</th>
              <th className="px-6 py-4">Follow up wth</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4 ">Status</th>

            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((follow, i) => (
                <tr
                  key={i}
                  className="bg-white border-b  hover:bg-gray-50 text-black cursor-pointer text-xs"
                >

                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {(page - 1) * entries + i + 1}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {follow?.assignee?.name ? follow?.assignee?.name : "NIL"}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {follow?.leadId?.name ? follow?.leadId?.name : "NIL"}
                  </td>
                  <td className="px-6 py-4">
                    {follow?.dueDate ? follow?.dueDate?.split("T")[0].split("-").reverse().join("/") : "NIL"}
                  </td>
                  <td className="px-6 py-4">
                    {follow?.leadId?.email ? follow?.leadId?.email : "NIL"}
                  </td>
                  <td className="px-6 py-4">
                    {follow?.leadId?.phone ? follow?.leadId?.phone : "NIL"}
                  </td>

                  <td className={`px-6 py-4 capitalize `}>
                    <div
                      className={`p-2 px-4 flex justify-center items-center rounded-2xl text-xs  ${follow?.status === "Completed"
                          ? "bg-green-100 border-2 border-green-500"
                          : follow?.status === "Overdue"
                            ? "bg-red-100 border-2 border-red-500"
                            : "bg-yellow-100 border-2 border-yellow-500"
                        }`}
                    >
                      {follow?.status ? follow?.status : "NIL"}
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



    </>
  );
};

export default AllFollowTable;
