import React, { useEffect, useState } from "react";

const Pagination = ({dataLength, Data, page, setPage, entries, setEntries, getMethod }) => {

  // const [dataLength, setDataLength] = useState([...Data].length)
  console.log("dataLength", dataLength)
  console.log("entries", entries)

  console.log(page, Data)
  const prevHandler = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextHandler = () => {
    if (dataLength === entries) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  useEffect(() => {
    getMethod()

  }, [page, entries]);


  return (
    <div className="flex items-center gap-4">

      <select
        onChange={(e) => setEntries(e.target.value && Number(e.target.value))}
        className="border shadow p-2  rounded-lg text-secondary text-normal focus:outline-none w-3/4"
      >
        <option value="10" >10 entries</option>
        <option value="30" >30 entries</option>
        <option value="50" >50 entries</option>
        <option value="100" >100 entries</option>
        <option value="" >All entries</option>

      </select>

      <div className="flex border rounded  text-sm">
        {/* previous */}
        <button
          type="button"
          onClick={prevHandler}
          className={`border px-5 py-2 text-white
          ${page > 1
              ?
              "border-primary_colors/50 bg-primary_colors"
              :
              "border-gray-300 bg-gray-300"
            }
         rounded-s`}
        >
          Prev
        </button>

        {/*Page Count  */}
        <div className="border px-5 py-2 border-primary_colors/50 ">{page}</div>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextHandler}
          className={`border px-5 py-2 text-white ${dataLength === entries
            ? "border-primary_colors/50 bg-primary_colors"
            : "border-gray-300 bg-gray-300"
            } rounded-e`}
          disabled={!dataLength}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Pagination;
