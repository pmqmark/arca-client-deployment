// import React, { useEffect, useState } from 'react'
// import useAxiosPrivate from '../../hooks/useAxiosPrivate'
// import { getTeamFollowups, getallFollowup } from '../../utils/Endpoint';
// import { useSelector } from 'react-redux';
// import AllFollowTable from '../../components/Table/AllFollowTable';

// const AllFollowups = () => {
//     const axios = useAxiosPrivate();
//     const user = useSelector((state) => state?.auth?.userInfo);

//     const [follows, setFollows] = useState([])
//     const [status, setStatus] = useState("")
//     const [page, setPage] = useState(1);
//     const [entries, setEntries] = useState(10);

//     const isLeader = user?.role === "leader";

//     const dataFetchRoute = isLeader ? `${getTeamFollowups}/${user?._id}` : getallFollowup

//     const getData = async () => {
//         await axios.get(`${dataFetchRoute}?status=${status}&page=${page}&entries=${entries}`)
//             .then((res) => {
//                 setFollows(res?.data)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })

//     }

//     useEffect(() => {
//         getData()
//     }, [status])

//     return (
//         <div className="w-full min-h-screen text-black my-[5vh]">
//             <div className='flex justify-between'>
//                 <h1 className="text-primary_colors text-2xl font-bold">Follow-ups of Team</h1>

//                 <select
//                     onChange={(e) => setStatus(e.target.value)}
//                     className="w-fit border shadow p-2  rounded-lg text-secondary text-normal focus:outline-none"
//                 >
//                     <option value="" >All</option>
//                     <option value="today" >Today's</option>
//                     <option value="upcoming" >Upcoming</option>
//                     <option value="overdue" >Overdue</option>
//                     <option value="completed" >Completed</option>

//                 </select>
//             </div>
//             <div className='mt-5'>
//                 <AllFollowTable
//                     Cb={getData}
//                     data={follows}
//                     page={page}
//                     setPage={setPage}
//                     entries={entries}
//                     setEntries={setEntries}
//                 />
//             </div>
//         </div>
//     )
// }

// export default AllFollowups