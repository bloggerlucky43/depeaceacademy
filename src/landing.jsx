import Login from "./component/login";
import Dashboard from "./student/dashboard";
import Profile from "./student/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import Fees from "./student/fees";
import Results from "./student/Result";
import PayFee from "./student/payfee";
import TeacherDashboard from "./teacher/teacherdashboard";
import TeacherResult from "./teacher/TeacherResult";
import TeacherSetting from "./teacher/teachersetting";
import AdminDashboard from "./admin/admindashboard";
import TeacherManage from "./admin/usermanagement/teachers";
import ListofStudent from "./admin/usermanagement/students";
import Subjects from "./admin/academics/subjects";
import ListOfResult from "./admin/academics/results";
import EditResult from "./teacher/editresult";
import AddNewStudent from "./admin/usermanagement/AddStudent";
import AddNewTeacher from "./admin/usermanagement/AddNewTeacher";
import PendingResult from "./admin/academics/pendingResult";
import GenerateReceipt from "./admin/academics/generateReceipt";
import ProtectedRoute from "./ProtectedRoute";
import ForgetPassword from "./component/forgetpassword";
import ResetPassword from "./component/resetpassword";

const Landing = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Teacher Only */}

          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher/results"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher/edit/results"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <EditResult />
              </ProtectedRoute>
            }
          />

          {/* student only */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/results"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Results />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/receipt"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Fees />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/payment"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <PayFee />
              </ProtectedRoute>
            }
          />

          {/* admin only */}

          <Route
            path="/admin_dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/teachers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TeacherManage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ListofStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/addNewTeacher"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddNewTeacher />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/academics"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Subjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/academics/results"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ListOfResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/addNewStudent"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddNewStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/academics/pendingresults"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PendingResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/academics/receipts"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <GenerateReceipt />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>

    //     <Route path="/teacher/settings" element={<TeacherSetting />} />
  );
};

export default Landing;
