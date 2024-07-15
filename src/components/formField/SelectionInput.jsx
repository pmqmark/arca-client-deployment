import React from "react";

const SelectionInput = ({name,placeholder}) => {
  return (
    <>
      <select name={name} id="" className={`border text-xs p-3 focus:outline-none w-full rounded-lg`}ḍ>
        <option value="">{placeholder}</option>
      </select>
    </>
  );
};

export default SelectionInput;
