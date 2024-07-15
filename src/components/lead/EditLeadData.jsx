import React, { useEffect } from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Input from "../formField/Input";
import ReqLoader from "../loading/ReqLoader";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getEmployeesRoute, getTeamMembers, updateLeadRoute } from "../../utils/Endpoint";
import { EmployeeCards, WorkerCards } from "../../data/Employee";
import { toast } from "react-toastify";
import { LeadStatuses } from "../../data/Dashboard";

const EditLeadData = ({ setModal, data, getMethod, isSuperior }) => {
  console.log(data);
  const axios = useAxiosPrivate();

  const leadsources = useSelector(state => state.data.leadSources) || [];


  const [formData, setFormData] = useState({
    leadId: data?._id,
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    country: data?.country,
    leadSource: data?.leadSource,
    assignee: data?.assignee?._id,
    status: data?.status,
    department: data?.assignee?.department,
    convertible: false,
  });
  const [loader, setLoader] = useState(false);
  const [employee, setEmployee] = useState([]);
  const user = useSelector((state) => state?.auth?.userInfo);
  const isLeader = user?.role === "leader";

  const getEmployees = async () => {
    const fetchRoute = isLeader ? `${getTeamMembers}/${user?._id}` : getEmployeesRoute;

    try {
      const response = await axios.get(
        `${fetchRoute}?department=${formData?.department}`
      );
      setEmployee(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [formData?.department]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const toggleHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const response = await axios.put(updateLeadRoute, formData);
      console.log(response);
      if (response?.status === 200) {
        toast.success(response?.data?.msg);
        getMethod();
        setModal(false);
      }
    } catch (error) {
      console.log(error);
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
            Edit Lead Data
          </h1>
          <form
            action=""
            onSubmit={SubmitHandler}
            className="bg-primary_colors/20  rounded-lg p-2"
          >
            <div className="w-full flex flex-wrap">
              <>
                {
                  <>
                    <div className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name="name"
                        type="text"
                        value={formData?.name}
                        changeHandler={changeHandler}
                        placeholder="Name"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name="email"
                        type="email"
                        value={formData?.email}
                        changeHandler={changeHandler}
                        placeholder="Email"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name="phone"
                        type="text"
                        value={formData?.phone}
                        changeHandler={changeHandler}
                        placeholder="Phone"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-1 py-2">
                      <Input
                        name="country"
                        type="text"
                        value={formData?.country}
                        changeHandler={changeHandler}
                        placeholder="Country"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-1 py-2">

                      <select
                        name="leadSource"
                        value={formData?.leadSource?.toUpperCase()}
                        className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                        onChange={changeHandler}
                      >
                        <option value="">Select Lead Source</option>
                        {leadsources?.length > 0 ? (
                          leadsources.map((item, i) => (
                            <option key={i} value={item?.toUpperCase()}>
                              {item}
                            </option>
                          ))
                        ) : (
                          <option>No Available Data</option>
                        )}
                      </select>
                    </div>

                    <div className="w-full md:w-1/2 p-1 py-2">
                      <select
                        className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                        name="status"
                        id=""
                        value={formData?.status}
                        onChange={changeHandler}
                      >
                        <option className="" value="">
                          Select A Status{" "}
                        </option>

                        {
                          LeadStatuses?.map(status => (
                            <option key={status.id} className="" value={status.name}>
                              {" "}
                              {status.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    {isSuperior &&
                      <>
                        <div className="w-full flex flex-col md:flex-row gap-3 p-1 py-2">
                          <select
                            name="department"
                            value={formData?.department}
                            id=""
                            className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                            onChange={changeHandler}
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
                            value={formData?.assignee}
                            id=""
                            className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                            required
                            onChange={changeHandler}
                          >
                            <option value="">Select Assignee</option>
                            {employee?.length > 0 ? (
                              employee.map((emp, i) => (
                                <option key={i} value={emp?._id}>
                                  {emp?.name}
                                </option>
                              ))
                            ) : (
                              <option>No Available Data</option>
                            )}
                          </select>
                        </div>


                      </>
                    }

                    {
                      data?.status !== "Converted"
                      &&
                      <div className="w-fit flex md:flex-row ml-1 gap-3 px-3 py-2 md:items-center bg-white rounded-lg border border-primary_colors/50">
                        <span className="text-xs">Convert as Application</span>
                        <label className="switch">
                          <input name="convertible"
                            onChange={toggleHandler}
                            type="checkbox" checked={formData?.convertible} />
                          <span className="slider round"></span>
                        </label>
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

export default EditLeadData;
