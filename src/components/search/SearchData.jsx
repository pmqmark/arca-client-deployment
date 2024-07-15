import React from "react";
import { CiSearch } from "react-icons/ci";


const SearchData = ({placeholder,handleKeyPress,searchHandler,setSearch}) => {
  

  return (
    <div className="w-full relative md:flex">
      <CiSearch
        onClick={searchHandler}
        className="absolute text-slate-400 top-2 ms-3 cursor-pointer"
        size={20}
      />
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        className="border w-full ps-10 p-2 rounded-lg shadow-sm outline-none ring-0 text-sm text-slate-400"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchData;
