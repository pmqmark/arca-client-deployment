import React, { useState } from "react";
import ReqLoader from "../loading/ReqLoader";
import { IoClose } from "react-icons/io5";
import Input from "../formField/Input";
import { EmployeeCards } from "../../data/Employee";
import { createLeadRoute, getEmployeesRoute, getTeamMembers } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ManuelEntry = ({ setModal, cb }) => {
  const axios = useAxiosPrivate();

  const user = useSelector((state) => state?.auth?.userInfo);
  const leadsources = useSelector(state => state.data.leadSources) || [];

  const isAdmin = user?.role === "admin";
  const isLeader = user?.role === "leader";
  const isSuperior = ["admin", "leader"].includes(user?.role)
  const isEmployee = user?.role === "employee";
  const userId = user?._id

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    country: "", leadSource: "",
    assignee: isEmployee ? userId : "",
  });

  const [loader, setLoader] = useState(false);

  const [employee, setEmployee] = useState([]);

  const employeeCataChange = async (e) => {
    const fetchRoute = isLeader ? `${getTeamMembers}/${userId}` : getEmployeesRoute;

    try {
      const response = await axios.get(
        `${fetchRoute}?department=${e.target.value}`
      );
      setEmployee(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true)
      const response = await axios.post(createLeadRoute, formData);
      console.log(response)
      if (response?.status === 200) {
        toast.success(response?.data?.msg);
        cb();
        setModal(false);
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg || "Something Went Wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white md:w-1/2 rounded-lg  p-5">
        <IoClose
          onClick={() => setModal(false)}
          className="absolute right-1 top-1 rounded bg-primary_colors text-white cursor-pointer"
        />
        <div className="flex flex-col w-full items-center justify-center border-2 rounded-lg border-dotted border-primary_colors p-5 md:p-17">
          <h1 className="font-bold text-center text-xl md:text-[25px] text-primary_colors pb-3">
            Lead Manual Entry
          </h1>
          <form action="" onSubmit={SubmitHandler} className="bg-primary_colors/20  rounded-lg p-2">
            <div className="w-full flex flex-wrap">
              <>
                {
                  <>
                    <div className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name="name"
                        type="text"
                        changeHandler={changeHandler}
                        placeholder="Name"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name="email"
                        type="email"
                        changeHandler={changeHandler}
                        placeholder="Email"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name="phone"
                        type="text"
                        changeHandler={changeHandler}
                        placeholder="Phone"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name="country"
                        type="text"
                        changeHandler={changeHandler}
                        placeholder="Country"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-1 py-2">

                      <select
                        name="leadSource"
                        id=""
                        className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                        onChange={changeHandler}
                      >
                        <option value="">Select Lead Source</option>
                        {leadsources?.length > 0 ? (
                          leadsources.map((item, i) => (
                            <option key={i} value={item}>
                              {item}
                            </option>
                          ))
                        ) : (
                          <option>No Available Data</option>
                        )}
                      </select>
                    </div>

                    {
                      !isEmployee
                      &&
                      <div className="w-full flex flex-col md:flex-row gap-3 p-1 py-2">
                        <select
                          name=""
                          id=""
                          className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                          onChange={employeeCataChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {EmployeeCards.map((items, i) => (
                            <option key={i} value={items?.path}>
                              {items?.name}
                            </option>
                          ))}
                        </select>

                        <select
                          name="assignee"
                          id=""
                          className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                          required
                          onChange={changeHandler}
                        >
                          <option value="">Select Assignee</option>
                          {employee?.length > 0 ? (
                            employee.map((items, i) => (
                              <option key={i} value={items?._id}>
                                {items?.name}
                              </option>
                            ))
                          ) : (
                            <option>No Available Data</option>
                          )}
                        </select>
                      </div>
                    }

                  </>
                }
              </>
            </div>

            {/* BUTTON */}
            <div className="text-white text-normal space-x-3 flex items-center justify-center mt-5">
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
      {loader && <ReqLoader />}
    </div>
  );
};

export default ManuelEntry;
