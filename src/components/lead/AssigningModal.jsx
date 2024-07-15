import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { bulkAssignLeadRoute, getEmployeesRoute, getTeamMembers, getWorkers } from "../../utils/Endpoint";
import { CiSearch } from "react-icons/ci";
import ReqLoader from "../loading/ReqLoader";
import { toast } from "react-toastify";

const AssigningModal = ({ setModal, getData, leadList,
  selectedRows,setSelectedRows, isLeader, userId, setAllSelected }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    leadList: leadList,
    assignee: "",
  });

  const axios = useAxiosPrivate();

  const initialData = async () => {
    const fetchRoute = isLeader ? `${getTeamMembers}/${userId}` : getEmployeesRoute;
    setLoading(true);
    try {
      const response = await axios.get(
        `${fetchRoute}?search=${search}`
      );
      setData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialData();
  }, []);

  const selectData = (Data) => {
    setSelectedData(Data);
    setFormData({
      ...formData,
      assignee: Data?._id,
    });
  };

  const submitData = () => {
    if(leadList?.length === 0){ 
      return toast.warning('Please Select Leads')
    }
    
    if (selectedData && Object.keys(selectedData).length !== 0) {
      setLoading(true);
      axios
        .put(bulkAssignLeadRoute, formData)
        .then((res) => {
          getData();
          toast.success(res?.data?.msg);
          setAllSelected(false)
          setSelectedRows([])
          setModal(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.msg)
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.warning("Please select an employee");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white mt-60  md:mt-0 md:w-1/3 w-full rounded-lg p-5  md:p-10 md:px-14 m-5 flex flex-col items-center justify-center ">
        <IoClose
          onClick={() => setModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer"
        />
        <h1 className="font-bold text-center text-xl md:text-[25px] text-primary_colors pb-3">
          Bulk assign
        </h1>
        <div className="w-full relative flex items-center justify-center">
          <input
            type="text"
            className="border-2  w-full p-2 rounded focus:outline-none text-sm"
            placeholder="Search Employee "
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch
            onClick={() => initialData()}
            size={22}
            className="absolute top-2 right-2 text-center cursor-pointer"
          />
        </div>

        {/* Data Listing  */}
        <div className="mt-5 md:mt-5 max-h-[200px] md:max-h-[250px] overflow-scroll flex flex-col gap-2 w-full">
          {data?.length > 0 ? (
            data?.map((items) => (
              <div
                key={items?._id}
                className={`bg-[#E3F2FB] capitalize p-2 text-sm rounded-xl flex items-center 
                gap-4 ps-5 cursor-pointer hover:bg-primary_colors hover:text-white ${
                  selectedData?._id === items?._id &&
                  "bg-primary_colors text-white"
                }`}
                onClick={() => selectData(items)}
              >
                <span className="bg-white p-1 rounded-full">
                  <CgProfile className="text-primary_colors" size={20} />
                </span>
                <h1>{items?.name}</h1>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center ">
              <h1 className="text-xs text-gray-400">
                --- No data available ---
              </h1>
            </div>
          )}
        </div>

        <div className="mt-5 w-full">
          <button
            onClick={submitData}
            className="bg-primary_colors p-2 w-full text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default AssigningModal;
