// export const baseUrl = "https://server.arcanoe.in"
export const baseUrl = "http://localhost:8800"

// Login page
export const loginPost = '/api/auth/login'

// Logout
export const userLogout = '/api/auth/logout'

// employee Dashboard data
export const dashData = '/api/admin/get-application-metrics'

// Register Student
export const studentRegisterRoute = '/api/student/create'

//Register Employee
export const employeeRegisterRoute = '/api/employee/create'

// Get Employee list by department;
export const getEmployeesRoute = '/api/employee/get-all';

export const getAllLeaders = '/api/employee/get-all-leaders';

export const getTeamMembers = '/api/employee/get-team-members';

//Get an Employee;
export const getAnEmployeeRoute = '/api/employee/get';

//Get an Application;
export const getAnApplicationRoute = '/api/application/get';

// Get all Applications;
export const getAllApplications ='/api/application/get-all';

export const getMyApplications ='/api/application/get-emps';

export const getTeamApplications ='/api/application/get-team';

// Get all StudentData;
export const getAllStudent ='/api/student/get-all';

export const getWorkStudents ='/api/student/get-work-students';

export const getTeamStudents ='/api/student/get-team-students';

// Get an employee data;
export const getAEmployeeData ='/api/employee/get'

//Get Assigned works;
export const getAssignedWorksRoute = '/api/employee/get-assigned-works'

export const getTeamWorksRoute = '/api/employee/get-team-works'

// Get Route to refresh token;
export const refreshTokenRoute = '/api/auth/refresh-token';

// Post Route to Send Otp;
export const sendOtpRoute = '/api/auth/send-otp'

// Post Route to verify email;
export const verifyOtpRoute = '/api/auth/verify-mail'

//Put Update employee
export const updateEmployeeRoute = '/api/employee/update'

//Put change-Password of Employee
export const changeEmpPwdRoute = '/api/employee/change-password'

//Put Deactivate-Employee
export const deactivateEmployeeRoute = '/api/employee/deactivate';

//Put Deactivate-Student
export const deactivateStudentRoute = '/api/student/deactivate';

//Get A Student
export const getAStudentRoute = '/api/student/get';

//Put Update-Student
export const updateStudentRoute = '/api/student/update';

//Put Change-Password of Student
export const changeStdtPwdRoute = '/api/student/change-password';

//Put Change-Password of Admin
export const changeAdmnPwdRoute = '/api/admin/change-password';

//Get Admin;
export const getAdminRoute = '/api/admin/get'; //<== + AdminId

//Put Update Admin;
export const updateAdminRoute = '/api/admin/update';

//Put Assign Work;
export const workAssignRoute = '/api/admin/assign-work';

//Put Assign Work;
export const workEmployeeAssignRoute = '/api/employee/assign-work';

//Put Remove Assignee;
export const removeAssigneeRoute = '/api/admin/remove-assignee';

//Post Create application
export const createApplicationRoute = '/api/application/create';

//Delete Delete Application
export const deleteApplicationRoute = '/api/application/delete'; //<== + ApplicationId

//Put Update Application;
export const updateApplicationRoute = '/api/application/update';

//Post Upload Documents of an Application;
export const uploadDocumentRoute = '/api/application/upload-document'; //<== + ApplicationId

//Get All comments in an Application;
export const getAllComments = '/api/comment/get-all'; //<== + /resourceType + /resourceId;

//Post a Comment;
export const postComment = '/api/comment/add';

// Get Employee Task Metrics;
export const getEmpTaskMetrics = "/api/employee/get-task-metrics"; //<== + EmployeeId

// Create task
export const createTask = '/api/project/add-task'; 

// Update  task
export const updateTask = '/api/project/update-task'; 

// Get All task from a project
export const getAllTask = '/api/project/get-all-tasks'; //<== + ProjectId

// Put Update Stepper;
export const changeStepStatus = "/api/stepper/update"

// Create Project
export const createProject = "/api/project/create";

// Get all Projects
export const getAllProjects = "/api/project/get-all";

// Get all Projects
export const getEmpProjects = "/api/project/get-all-of-emp";

// Get Project
export const getProject = "/api/project/get"; //<== + Projectid

// Delete Project
export const deleteProject = "/api/project/delete"; //<== + Projectid

// Update Project Status
export const updateProjectStatus = "/api/project/update-status";

// Create a stepper
export const createStepper = "/api/stepper/create";

// Get a stepper
export const getStepper = "/api/stepper/get"; //<== + stepperid

// Get all steppers
export const getAllSteppers = "/api/stepper/get-all"; //<== + applicationid

// Delete a stepper
export const deleteStepper = "/api/stepper/delete"; //<== + stepperid

// get All Members From Project
export const getAllMembersFromProject = "/api/project/get-members"; //<== + project id

export const changePhaseOfApplication = "/api/application/phase-change"; //<== + application id

// To get all applications of a student in student side dashboard
export const getMyApplicationsRoute = "/api/student/get-my-applications"; //<== + student Id


// LEAD Management

// GET All Data 
export const getAllLeadData = "/api/lead/get-all"; //=>?page=""&entries=""&search

// Create bulk lead
export const createBulkLeadData = "/api/lead/create-bulk"; //=>?page=""&entries=""&search

export const createLeadRoute = "/api/lead/create";
export const updateLeadRoute = "/api/lead/update";
export const bulkAssignLeadRoute = "/api/lead/bulk-assign";
export const getLeadRoute = "/api/lead/get";
export const assignedLeadsRoute = "/api/lead/assigned-leads";
export const LeadsofTeamRoute = "/api/lead/team-leads";
export const deleteLeadRoute = "/api/lead/delete";


export const createFollowup = "/api/lead/followup/create"
export const updateFollowup = "/api/lead/followup/update"
export const getFollowup = "/api/lead/followup/get"

// Route to fetch followups of a particular Lead
export const leadFollowup = "/api/lead/followup/of-lead"

// Different routes for fetching Followup data based on user
export const getallFollowup = "/api/lead/followup/get-all"
export const getTeamFollowups = "/api/lead/followup/get-team"
export const getFollowupsOfEmp = "/api/lead/followup/emp"


export const getEmpLeadsnApps = "/api/admin/get-emps-appsnleads"
export const getLeadsnApps = "/api/admin/get-appsnleads"
export const getLeadStages = "/api/admin/get-leadstages"

export const getTeamTaskMetrics = "/api/employee/get-team-task-metrics"

export const getWorkers = "/api/employee/get-workers"


export const getTeamLeadMetrics = '/api/employee/get-team-lead-metrics'
export const getEmpLeadMetrics = '/api/employee/get-lead-metrics'

export const getTeamFollowupMetrics = '/api/employee/get-team-followup-metrics'
export const getEmpFollowupMetrics = '/api/employee/get-followup-metrics'

export const addDataRoute = '/api/data/add'
export const getDataRoute = '/api/data/get'

export const officeAdminRoute = '/api/admin/office'
export const officeCommonRoute = '/api/data/office'