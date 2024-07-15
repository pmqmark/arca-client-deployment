import React, { useEffect, useState } from "react";
import LeadTable from "../../components/Table/LeadTable";
import ExcelModal from "../../components/modals/ExcelModal";
import ManuelEntry from "../../components/lead/ManuelEntry";
import AssigningModal from "../../components/lead/AssigningModal";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { LeadsofTeamRoute, assignedLeadsRoute, getAllLeadData, getEmployeesRoute, getTeamMembers } from "../../utils/Endpoint";
import ReqLoader from "../../components/loading/ReqLoader";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import { LeadStatuses } from "../../data/Dashboard";

const LeadManagement = () => {
  const leadsources = useSelector(state => state.data.leadSources) || [];

  const [excelModal, setExcelModal] = useState(false);
  const [manuelModal, setManuelModal] = useState(false);
  const [bulkModal, setBulkModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.auth?.userInfo);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [leadList, setLeadList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState({
    start_date: '',
    end_date: ''
  });

  const [assignees, setAssignees] = useState([])
  const [assignee, setAssignee] = useState("")

  const [leadSource, setLeadSource] = useState("")
  const [totalCount, setTotalCount] = useState(0)

  const [allSelected, setAllSelected] = useState(false);

  const axios = useAxiosPrivate();

  console.log(user)

  const isAdmin = user?.role === "admin";
  const isLeader = user?.role === "leader";
  const isSuperior = ["admin", "leader"].includes(user?.role)
  const isEmployee = user?.role === "employee";

  const dataFetchRoute = isAdmin
    ? getAllLeadData
    : isLeader
      ? LeadsofTeamRoute + "/" + user?._id
      : isEmployee
      && assignedLeadsRoute + "/" + user?._id;

  // Initial Data Load
  const getData = () => {
    setLoading(true);
    axios
      .get(
        `${dataFetchRoute}?status=${status}&leadSource=${leadSource}&page=${page}&entries=${entries}&search=${search}&start_date=${date?.start_date}&end_date=${date?.end_date}&assignee=${assignee}`
      )
      .then((res) => {
        console.log(res);
        setTableData(res?.data?.lead);
        setTotalCount(res?.data?.count)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to format data as CSV
  const convertToCSV = (objArray) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    // Custom headings
    const headings = [
      "Name",
      "Email",
      "Phone Number",
      "Lead from",
      "Status",
      "Date",
      "Assignee",
    ];

    // Append headings to the CSV string
    str += headings.join(",") + "\r\n";

    // Loop through each object in the array
    for (let i = 0; i < array.length; i++) {
      let line = "";

      const loopData = {
        name: array[i]['name'],
        email: array[i]['email'],
        phone: array[i]['phone'],
        leadSource: array[i]['leadSource'],
        status: array[i]['status'],
        assignedDate: array[i]['assignedDate'],
        assignee: array[i]['assignee'],
      }
      // Loop through each property in the object
      for (let key in loopData) {
        // Replace assignee value with a common value
        let value;
        if (key === "assignee") {
          if (array[i]["assignee"] && array[i]["assignee"]["name"]) {
            value = array[i]["assignee"]["name"]

          } else {
            value = 'NIL'

          }
        }
        else if (key === "assignedDate") {
          if (array[i][key]) {
            value = array[i][key]
          }
          else {
            value = 'Unassigned'
          }
        }
        else {
          value = array[i][key]
        }

        // Append the value to the line
        if (line !== "") line += ",";
        line += value;
      }

      // Append the line to the CSV string
      str += line + "\r\n";
    }

    return str;
  };

  const downloadHandler = async () => {
    setLoading(true);
    axios
      .get(`${dataFetchRoute}?status=${status}&search=${search}&date=${date}`)
      .then((res) => {
        console.log(res);
        const csvData = convertToCSV(res?.data?.lead);
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Lead.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Downloading have some error please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const getAssignees = async () => {
    const fetchRoute = isLeader ? `${getTeamMembers}/${user?._id}` : isAdmin && getEmployeesRoute;
    setLoading(true);
    try {
      const response = await axios.get(
        fetchRoute
      );
      response && setAssignees(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    getAssignees();
  }, [status, date, assignee, leadSource]);

  return (
    <>
      <div className="w-full h-full text-black pt-10 pb-28">
        <div className="w-full flex flex-col sm:items-center sm:flex-row justify-between">
          <h1 className="text-primary_colors text-2xl font-bold">
            Lead Management 
          </h1>

          <span className="w-fit bg-primary_colors text-white p-2 rounded-lg">
            Total : {totalCount}
          </span>

          <div className="mt-7 sm:mt-0 flex flex-col sm:flex-row gap-5 justify-between sm:justify-normal">

            <select
              className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
              name="leadSource"
              onChange={(e) => setLeadSource(e.target.value)}
            >
              <option className="" value="">
                Select Lead Source
              </option>
              {
                leadsources?.map((leadSource, i) => (
                  <option key={i} className="" value={leadSource}>
                    {" "}
                    {leadSource}
                  </option>
                ))
              }
            </select>

            {
              !isEmployee
              &&
              <select
                className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
                name="assignee"
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option className="" value="">
                  Select Assignee{" "}
                </option>
                {
                  assignees?.map(assignee => (
                    <option key={assignee?._id} className="" value={assignee?._id}>
                      {" "}
                      {assignee?.name}
                    </option>
                  ))
                }
              </select>
            }

            <div className="relative">
              <label htmlFor="" className="absolute top-[-20px] left-0 text-xs ">
                Starting Date
              </label>
              <input
                onChange={(e) => setDate((prev) => ({ ...prev, start_date: e.target.value }))}
                type="date"
                name="start_date"
                placeholder=""
                className="cursor-pointer border border-primary_colors p-2  rounded-lg text-secondary text-normal focus:outline-none w-full"
              />
            </div>

            <div className="relative">
              <label htmlFor="" className="absolute top-[-20px] left-0 text-xs ">
                Ending Date
              </label>
              <input
                onChange={(e) => setDate((prev) => ({ ...prev, end_date: e.target.value }))}
                type="date"
                name="end_date"
                placeholder=""
                className="cursor-pointer border border-primary_colors p-2  rounded-lg text-secondary text-normal focus:outline-none w-full"
              />
            </div>

          </div>

        </div>

        <div className="mt-5 md:mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-white gap-3">

            <button
              onClick={() => setManuelModal(true)}
              className="bg-primary_colors p-2.5 px-4 rounded-lg text-sm w-full"
            >
              Manual entry
            </button>

            {isSuperior && (
              <>
                <button
                  onClick={() => setExcelModal(true)}
                  className="bg-primary_colors p-2.5 px-4 rounded-lg text-sm w-full"
                >
                  Add via excel
                </button>


                <button
                  onClick={() => setBulkModal(true)}
                  className="bg-primary_colors p-2.5 px-4 rounded-lg text-sm w-full"
                >
                  Bulk Assign
                </button>
              </>
            )}

            {
              !isEmployee &&
              <button
                onClick={downloadHandler}
                className="bg-primary_colors p-2.5 px-4 rounded-lg text-sm w-full"
              >
                Download excel
              </button>
            }

            <select
              className={`border border-primary_colors/50 text-gray-400 text-xs p-3 focus:outline-none w-full rounded-lg`}
              name="status"
              id=""
              onChange={(e) => setStatus(e.target.value)}
            >
              <option className="" value="">
                Select Status{" "}
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

            <div className="w-full relative flex items-center justify-center">
              <input
                type="text"
                className="border border-primary_colors/50  w-full p-2 rounded-lg focus:outline-none text-sm text-black"
                placeholder="Search  "
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && getData()}
              />
              <CiSearch
                onClick={() => getData()}
                size={22}
                className="absolute top-2 right-2 text-center cursor-pointer text-primary_colors"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <LeadTable
            Cb={getData}
            data={tableData}
            isSuperior={isSuperior}
            isAdmin={isAdmin}
            page={page}
            setPage={setPage}
            entries={entries}
            setEntries={setEntries}
            setFormData={setLeadList}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            allSelected={allSelected}
            setAllSelected={setAllSelected}
          />
        </div>
      </div>

      {/* {excelModal && <ExcelModal setModal={setExcelModal} />} */}

      {manuelModal && (
        <ManuelEntry setModal={setManuelModal} getMethod={getData} />
      )}

      {loading && <ReqLoader />}

      {excelModal && <ExcelModal setModal={setExcelModal} getData={getData} />}

      {manuelModal && <ManuelEntry setModal={setManuelModal} cb={getData} />}

      {bulkModal && (
        <AssigningModal
          setModal={setBulkModal}
          getData={getData}
          leadList={leadList}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          isLeader={isLeader}
          userId={user?._id}
          setAllSelected={setAllSelected}
        />
      )}
    </>
  );
};

export default LeadManagement;
