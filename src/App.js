import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Layout from './layout/Layout';

import AdminProtectedRoute from './routes/AdminProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import ViewEmployees from './components/employee/ViewEmployees';
import EmployeeProfile from './components/employee/EmployeeProfile';
import Application from './components/application/Application';
import AllApplications from './components/application/AllApplications';
import Student from './pages/admin/Student'

import Employee from './pages/admin/Employee'
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import AssignedWork from './pages/employee/AssignedWork'

import StudentProtectedRoute from './routes/StudentProtectedRoute';
import StudentDashboard from './pages/student/StudentDashboard';
import Project from './pages/admin/Project';
import SearchApplication from "./components/search/Application"
import Team from './components/projeect/Team';
import Stepper from './pages/admin/Stepper';
import StaffProtectedRoute from './routes/StaffProtectedRoute';
import StudentApplication from './pages/student/StudentApplication';
import LeadManagement from './pages/admin/LeadManagement';
import Followups from './pages/employee/Followups';
// import AllFollowups from './pages/admin/AllFollowups';
import EmpProtectedRoute from './routes/EmpProtectedRoute';
import NotFound from './pages/NotFound';
import ViewTeam from './components/Leader/ViewTeam';
import Settings from './pages/settings/Settings';
import { useDispatch } from 'react-redux';
import { getDataRoute, officeCommonRoute } from './utils/Endpoint';
import axios from './api/axios';
import { setLeadSourceData, setOfficeDatas } from './redux/slices/CommonDataReducer';
import { useEffect } from 'react';


function App() {

  const dispatch = useDispatch();

  const getListData = async (name)=>{
    try {
      const response = await axios.get(`${getDataRoute}?name=${name}`)
      return response?.data?.list || [];
      
    } catch (error) {
      console.log(error)
    }
  }

  const getOfficesData = async ()=>{
    try {
      const response = await axios.get(officeCommonRoute)
      const officeData=  response?.data?.office || [];
      dispatch(setOfficeDatas(officeData))
      
    } catch (error) {
      console.log(error)
    }
  }

  const getLeadSources = async()=>{
    const leadSources = await getListData("leadSource");
    dispatch(setLeadSourceData(leadSources))
  }

  useEffect(()=>{
    getLeadSources()
    getOfficesData()
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path='/' element={<Login />} />
          <Route path='/' element={<Layout />}>


            {/* Admin Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path='admin/dashboard' element={<Dashboard />} />
              <Route path='admin/employee' element={<Employee />} />
              <Route path='admin/employee/list/:role' element={<ViewEmployees />} />
              {/* <Route path='admin/employee/profile/:id' element={<EmployeeProfile />} /> */}
              <Route path='admin/applications' element={<AllApplications />} />
              <Route path='admin/student' element={<Student />} />
              <Route path='admin/project' element={<Project />} />
              <Route path='admin/project/team/:proId' element={<Team />} />
              <Route path='admin/followups' element={<Followups />} />
              <Route path='applications/search' element={<SearchApplication />} />
              <Route path='profile/:id' element={<EmployeeProfile />} />
              <Route path="settings" element={<Settings/>} />
            </Route>

            {/* Routes for Both Admin and Employee */}
            <Route element={<StaffProtectedRoute />}>
              <Route path='profile' element={<EmployeeProfile />} />
              <Route path='applications/stepper/:id' element={<Stepper />} />
              <Route path='applications/:id/:stepperId' element={<Application />} />
              <Route path='leads' element={<LeadManagement />} />
            </Route>

            {/* Employee Routes */}
            <Route element={<EmpProtectedRoute />}>
              <Route path='employee/dashboard' element={<EmployeeDashboard />} />
              <Route path='employee/task' element={<AssignedWork />} />
              <Route path='employee/application/:id/:stepperId' element={<Application />} />
              <Route path='employee/applications' element={<AllApplications />} />
              <Route path='employee/students' element={<Student />} />
              <Route path='employee/projects' element={<Project />} />
              <Route path='employee/project/team/:proId' element={<Team />} />
              <Route path='employee/followups' element={<Followups />} />
              <Route path='leader/followups' element={<Followups />} />
              <Route path='leader/team' element={<ViewTeam />} />
            </Route>

            {/* Student Routes */}
            <Route element={<StudentProtectedRoute />}>
              <Route path='student/dashboard' element={<StudentDashboard />} />
              <Route path='student/application/:id' element={<StudentApplication />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFound/>} />

        </Routes>
      </Router>
    </div >
  );
}

export default App;
