import { RxDashboard } from "react-icons/rx";
import { MdLeaderboard, MdOutlinePeople } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { TbBrowserCheck } from "react-icons/tb";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdCall } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";


export const Sidebar = [
    {
        id: 1,
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <RxDashboard size={25}/>
    },
    {
        id: 4,
        name: "Manage Team",
        path: "/admin/employee",
        icon: <MdOutlinePeople size={25}/>
    },
    {
        id: 3,
        name: "Leads",
        path: "/leads",
        icon: <MdLeaderboard size={25}/>
    },
    {
        id: 2,
        name: "Follow-ups",
        path: "/admin/followups",
        icon: <MdCall size={25}/>
    }, 
    {
        id: 5,
        name: "Applications",
        path: "/admin/applications",
        icon: <PiStudentFill size={25}/>
    },
    {
        id: 6,
        name: "Track Students",
        path: "/admin/student",
        icon: <TbBrowserCheck size={25}/>
    },
    {
        id: 7,
        name: "Projects",
        path: "/admin/project",
        icon: <AiOutlineFundProjectionScreen size={25}/>
    },
    {
        id: 8,
        name: "Settings",
        path: "/settings",
        icon: <IoSettings size={25}/>
    },
   
]

export const SidebarE = [
    {
        id: 1,
        name: "Dashboard",
        path: "/employee/dashboard",
        icon: <RxDashboard size={25}/>
    },
    {
        id: 8,
        name: "Profile",
        path: "/profile",
        icon: <CgProfile size={25}/>
    },
    {
        id: 3,
        name: "Leads",
        path: "/leads",
        icon: <MdLeaderboard size={25}/>
    },
    {
        id: 2,
        name: "Follow-up Tasks",
        path: "/employee/followups",
        icon: <MdCall size={25}/>
    },
    {
        id: 4,
        name: "Tasks",
        path: "/employee/task",
        icon: <MdOutlinePeople size={25}/>
    },
    {
        id: 5,
        name: "Applications",
        path: "/employee/applications",
        icon: <PiStudentFill size={25}/>
    },
    {
        id: 6,
        name: "Track Students",
        path: "/employee/students",
        icon: <TbBrowserCheck size={25}/>
    },
    {
        id: 7,
        name: "Projects",
        path: "/employee/projects",
        icon: <AiOutlineFundProjectionScreen size={25}/>
    },
    
]

export const SidebarL= [
    {
        id: 1,
        name: "Dashboard",
        path: "/employee/dashboard",
        icon: <RxDashboard size={25}/>
    },
    {
        id: 18,
        name: "Profile",
        path: "/profile",
        icon: <CgProfile size={25}/>
    },
    {
        id: 19,
        name: "Team Members",
        path: "/leader/team",
        icon: <MdOutlinePeople size={25}/>
    },
    {
        id: 2,
        name: "Follow-ups of Team",
        path: "/leader/followups",
        icon: <MdCall size={25}/>
    },
    {
        id: 3,
        name: "Leads of Team",
        path: "/leads",
        icon: <MdLeaderboard size={25}/>
    },
    {
        id: 4,
        name: "Tasks of Team",
        path: "/employee/task",
        icon: <MdOutlinePeople size={25}/>
    },
    {
        id: 5,
        name: "Applications",
        path: "/employee/applications",
        icon: <PiStudentFill size={25}/>
    },
    {
        id: 6,
        name: "Track Students",
        path: "/employee/students",
        icon: <TbBrowserCheck size={25}/>
    },
    {
        id: 7,
        name: "Projects",
        path: "/employee/projects",
        icon: <AiOutlineFundProjectionScreen size={25}/>
    },
    
]
