import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/login";
import ForgetPassword from "./component/forgetpassword";
import ResetPassword from "./component/resetpassword";
import Dashboard from "./student/dashboard";
import Profile from "./student/profile";
import Fees from "./student/fees";
import Results from "./student/Result";
import PayFee from "./student/payfee";
import TeacherDashboard from "./teacher/teacherdashboard";
import TeacherResult from "./teacher/TeacherResult";
import EditResult from "./teacher/editresult";
import AdminDashboard from "./admin/admindashboard";
import TeacherManage from "./admin/usermanagement/teachers";
import ListofStudent from "./admin/usermanagement/students";
import AddNewTeacher from "./admin/usermanagement/AddNewTeacher";
import AddNewStudent from "./admin/usermanagement/AddStudent";
import Subjects from "./admin/academics/subjects";
import ListOfResult from "./admin/academics/results";
import PendingResult from "./admin/academics/pendingResult";
import GenerateReceipt from "./admin/academics/generateReceipt";

const Landing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/results" element={<TeacherResult />} />
        <Route path="/teacher/edit/results" element={<EditResult />} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/results" element={<Results />} />
        <Route path="/student/receipt" element={<Fees />} />
        <Route path="/student/payment" element={<PayFee />} />

        {/* Admin Routes */}
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/admin/teachers" element={<TeacherManage />} />
        <Route path="/admin/users" element={<ListofStudent />} />
        <Route path="/admin/addNewTeacher" element={<AddNewTeacher />} />
        <Route path="/admin/addNewStudent" element={<AddNewStudent />} />
        <Route path="/admin/academics" element={<Subjects />} />
        <Route path="/admin/academics/results" element={<ListOfResult />} />

        <Route
          path="/admin/academics/pendingresults"
          element={<PendingResult />}
        />
        <Route path="/admin/academics/receipts" element={<GenerateReceipt />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default Landing;
