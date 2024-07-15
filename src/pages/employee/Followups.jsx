import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { getFollowupsOfEmp, getTeamFollowups, getallFollowup } from '../../utils/Endpoint';
import { useSelector } from 'react-redux';
import FollowTable from '../../components/Table/FollowTable';

const Followups = () => {
  const axios = useAxiosPrivate();
  const user = useSelector((state) => state.auth.userInfo);

  const [follows, setFollows] = useState([])
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [status, setStatus] = useState("")
  const [notePresence, setNotePresence] = useState("")
  const [date, setDate] = useState({
    start_date: '',
    end_date: ''
  });

  const isAdmin = user?.role === "admin";
  const isLeader = user?.role === "leader";
  const isEmployee = user?.role === "employee";

  const dataFetchRoute = isEmployee ? `${getFollowupsOfEmp}/${user?._id}` : isLeader ? `${getTeamFollowups}/${user?._id}` 
  : isAdmin && getallFollowup

  const getData = () => {
     axios.get(`${dataFetchRoute}?status=${status}&notePresence=${notePresence}&page=${page}&entries=${entries}&start_date=${date?.start_date}&end_date=${date?.end_date}`)
      .then((res) => {
        setFollows(res?.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  useEffect(() => {
    getData()
  }, [status, notePresence, date])

  return (
    <div className="w-full min-h-screen text-black my-[5vh]">
      <div className='flex flex-col sm:flex-row gap-5 sm:gap-0 justify-between'>
        <h1 className="text-primary_colors text-2xl font-bold">Follow-ups</h1>

        <select
          onChange={(e) => setNotePresence(e.target.value)}
          className="w-fit border shadow p-2 rounded-lg text-secondary text-normal focus:outline-none "
        >
          <option value="" >Select Note Presence</option>
          <option value="present" >Note Present</option>
          <option value="absent" >Note Absent</option>

        </select>

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

        <select
          onChange={(e) => setStatus(e.target.value)}
          className="w-fit border shadow p-2  rounded-lg text-secondary text-normal focus:outline-none"
        >
          <option value="" >Status</option>
          <option value="today" >Today's</option>
          <option value="upcoming" >Upcoming</option>
          <option value="overdue" >Overdue</option>
          <option value="completed" >Completed</option>

        </select>
      </div>

      <div className='mt-5'>
        <FollowTable
          Cb={getData}
          data={follows}
          page={page}
          setPage={setPage}
          entries={entries}
          setEntries={setEntries}
        />
      </div>
    </div>
  )
}

export default Followups