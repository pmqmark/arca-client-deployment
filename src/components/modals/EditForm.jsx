import React, { useEffect, useState } from "react";
import { Address, EmpFormData, FormData, Office } from "../../data/Dashboard";
import { IoClose } from "react-icons/io5";

import Input from "../formField/Input";

import {
  employeeRegisterRoute,
  studentRegisterRoute,
} from "../../utils/Endpoint";
import { toast } from "react-toastify";
import { EmployeeCards } from "../../data/Employee";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EditForm = ({entityData,setData, getTableData, setModal, entity }) => {
  const axios = useAxiosPrivate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    age: "",
    image: "",
    qualification: "",
    office: "",
    address: {
      houseName: "",
      city: "",
      state: "",
      pin: "",
    },
  });

  const [empFormData, setEmpFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    education: "",
    department: "",
    address: {
      houseName: "",
      city: "",
      state: "",
      pin: "",
    },
  });

  useEffect(()=>{
    if(entity === "Employee"){
        setEmpFormData((prev)=> ({...prev, ...entityData}))
    }
    else if(entity === "Student"){
        setFormData((prev)=> ({...prev, ...entityData}))
    }
  },[])


  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (entity === "Student") {
      if (["houseName", "city", "state", "pin"].includes(name)) {
        const addressField = name.split("address")[1]; // Get the specific address field
        console.log(addressField);
        setFormData((prevFormData) => ({
          ...prevFormData,
          address: {
            ...prevFormData.address,
            [name]: value, // Update the specific address field
          },
        }));
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (entity === "Employee") {
      if (["houseName", "city", "state", "pin"].includes(name)) {
        setEmpFormData((prevFormData) => ({
          ...prevFormData,
          address: {
            ...prevFormData.address,
            [name]: value,
          },
        }));
      } else {
        setEmpFormData({
          ...empFormData,
          [name]: value,
        });
      }
    }
  };

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (entity === "Student") {
      console.log(formData);
      if (!(formData?.name || formData?.email)) return;

      await axios
        .post(studentRegisterRoute, formData)
        .then((res) => {
          console.log(res.data);
          setModal(false);
          toast.success(res?.data?.msg);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.response?.data?.msg);
        });
    } else if (entity === "Employee") {
      console.log(empFormData);
      if (!(empFormData?.name || empFormData?.email)) return;

      await axios
        .post(employeeRegisterRoute, empFormData)
        .then((res) => {
          console.log(res.data);
          setModal(false);
          toast.success(res?.data?.msg);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.response?.data?.msg);
        });
    }
  };

  console.log("efd", empFormData);
  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white mt-60  md:mt-0 md:w-1/2 rounded-lg p-5  md:p-10 md:px-14 m-5">
        <h1 className="font-bold text-center text-xl text-primary_colors">
          Update {entity}
        </h1>
        <IoClose
          onClick={() => setModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer"
        />
        <div className="flex flex-col w-full mt-5">
          <form action="" onSubmit={submitHandler}>
            <div className="w-full flex flex-wrap">
              <>
                {entity === "Student" &&
                  FormData.map((data) => (
                    <div key={data?.id} className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name={data?.name}
                        placeholder={data?.placeholder}
                        type={data?.type}
                        changeHandler={changeHandler}
                        value={formData[data?.name]}
                        required={"required"}
                      />
                    </div>
                  ))}
                {entity === "Student" && (
                  <select
                    className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                    name="office"
                    id=""
                    onChange={changeHandler}
                  >
                    <option className="" value="">
                      Select A office
                    </option>
                    {Office.map((items, index) => (
                      <option key={index} className="" value={items?.name}>
                        {items?.name}
                      </option>
                    ))}
                  </select>
                )}

                {entity === "Employee" &&
                  EmpFormData.map((data) => (
                    <div key={data?.id} className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name={data?.name}
                        placeholder={data?.placeholder}
                        type={data?.type}
                        changeHandler={changeHandler}
                        value={empFormData[data?.name]}
                        required={"required"}
                      />
                    </div>
                  ))}
                {entity === "Employee" && (
                  <div className="flex w-full gap-2">
                    <select
                      className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                      name="department"
                      id=""
                      onChange={changeHandler}
                    >
                      <option className="" value="">
                        Select A Department
                      </option>
                      {EmployeeCards.map((items, index) => (
                        <option key={index} className="" value={items?.path}>
                          {items?.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                      name="office"
                      id=""
                      onChange={changeHandler}
                    >
                      <option className="" value="">
                        Select A office
                      </option>
                      {Office.map((items, index) => (
                        <option key={index} className="" value={items?.name}>
                          {items?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {Address.map((data) => (
                  <div key={data?.id} className="w-full md:w-1/2 p-1 py-2">
                    <Input
                      name={data?.name}
                      placeholder={data?.placeholder}
                      type={data?.type}
                      changeHandler={changeHandler}
                      value={
                        entityData?.address?.[data?.name]
                        // entity === "Student"
                        //   ? formData?.address?.[data?.name]
                        //   : empFormData?.address?.[data?.name]
                      }
                    />
                  </div>
                ))}
              </>
            </div>

            {/* BUTTON */}
            <div className="text-white text-normal space-x-3 flex items-center justify-end mt-10">
             
              <button
                type="submit"
                className="bg-primary_colors p-2 px-5 rounded-lg hover:scale-105 ease-in-out duration-200"
              >
                Submit
              </button>
              {/* )} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
