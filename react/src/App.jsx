import './css/component.css';
import './css/default.css';
import './css/style.css';
import './css/adminStyle.css';
import './css/chat.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';

//MainPages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';

//User Authentication
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerifyOTP from './pages/VerifyOTP';
import VerifyResetOTP from './pages/VerifyResetOTP';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Chat from './pages/chat';

//AdminPages
import GenerateReportAndAnalytics from './pages/admin/GenerateReportAndAnalytics';
import ManageCourseProgram from './pages/admin/ManageCourseProgram';
import ManageStudentAdmin from './pages/admin/manage-students';
import ManageInstructorAdmin from './pages/admin/manage-instructors';
import ManageQAOAdmin from './pages/admin/manage-qao';
import ManagePCOAdmin from './pages/admin/manage-pcos';
import ProfileAdmin from './pages/admin/AdminProfile';
import AdminDashboard from './pages/admin/AdminDashboard';

//InstructorPages
import InstructorProfile from './pages/instructor/InstructorProfile';
import ManageCourse from './pages/instructor/ManageCourse';
import ContentCreation from './pages/instructor/ContentCreation';
import StudentsAssessment from './pages/instructor/StudentsAssessment';
import S101 from './pages/instructor/S101';

//ProgCODPages
import ProfileProgCOD from './pages/programcod/PCODProfile';
import ManageCourseProgramCOD from './pages/programcod/ManageCourseProgramCOD';
import ProgramEvaluation from './pages/programcod/ProgramEvaluation';

//QAOPages
import QAOProfile from './pages/qao/QAOProfile';
import QAOPolicy from './pages/qao/QAOPolicy';
import QAOS101 from './pages/qao/QAOS101';
import QAOStudentsAssessment from './pages/qao/QAOStudentsAssessment';
import QAOManageStudent from './pages/qao/qao-manage-students';
import QAOManageInstructor from './pages/qao/qao-manage-instructors';
import QAOManageAdmin from './pages/qao/qao-manage-admins';
import QAOManagePCO from './pages/qao/qao-manage-pcos';

//StudentPages
import UserProgramOveriew from './pages/user/StudentOverview';
import StudentProfile from './pages/user/student-profile';
import CourseCatalog from './pages/user/CourseCatalog';
import CourseMaterial from './pages/user/CourseMaterial';
import CS101 from './pages/user/CS101';
import GiveExam from './pages/user/GiveExam';
import StudentProgress from './pages/user/StudentProgress';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />

        <Route path="/Login" element={<Login />} />
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/VerifyOTP' element={<VerifyOTP/>}/>
        <Route path='/VerifyResetOTP' element={<VerifyResetOTP/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/ResetPassword' element={<ResetPassword/>}/>

        <Route path="/Chat" element={<Chat/>} />

        <Route path="/GenerateReportAndAnalytics" element={<GenerateReportAndAnalytics />} />
        <Route path="/ManageStudentAdmin" element={<ManageStudentAdmin />} />
        <Route path="/ManageInstructorAdmin" element={<ManageInstructorAdmin />} />
        <Route path="/ManageQAOAdmin" element={<ManageQAOAdmin />} />
        <Route path="/ManagePCOAdmin" element={<ManagePCOAdmin />} />
        <Route path="/ProfileAdmin" element={<ProfileAdmin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/ManageCourseProgram" element={<ManageCourseProgram />} />

        <Route path="/InstructorProfile" element={<InstructorProfile />} />
        <Route path="/ManageCourse" element={<ManageCourse />} />
        <Route path="/ContentCreation" element={<ContentCreation />} />
        <Route path="/StudentsAssessment" element={<StudentsAssessment />} />
        <Route path="/S101/:studentID" element={<S101/>} />


        <Route path="/ProfileProgCOD" element={<ProfileProgCOD />} />
        <Route path="/ManageCourseProgramCOD" element={<ManageCourseProgramCOD />} />
        <Route path="/ProgramEvaluation" element={<ProgramEvaluation />} />
        <Route path="/QAOManageStudent" element={<QAOManageStudent />} />
        <Route path="/QAOManageInstructor" element={<QAOManageInstructor />} />
        <Route path="/QAOManageAdmin" element={<QAOManageAdmin />} />
        <Route path="/QAOManagePCO" element={<QAOManagePCO />} />

        <Route path="/QAOProfile" element={<QAOProfile />} />
        <Route path="/QAOPolicy" element={<QAOPolicy />} />
        <Route path="/QAOS101/:studentID" element={<QAOS101/>} />
        <Route path="/QAOStudentsAssessment" element={<QAOStudentsAssessment />} />

        <Route path="/StudentProfile" element={<StudentProfile />} />
        <Route path="/CourseCatalog" element={<CourseCatalog />} />
        <Route path="/CourseMaterial" element={<CourseMaterial />} />
        <Route path="/UserProgramOveriew" element={<UserProgramOveriew />} />
        <Route path="/CS101" element={<CS101 />} />
        <Route path="/GiveExam" element={<GiveExam />} />
        <Route path="/StudentProgress" element={<StudentProgress />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
