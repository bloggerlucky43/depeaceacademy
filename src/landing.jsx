import { useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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

const AppRoutes = () => {
  const { pageloading } = useContext(AuthContext);

  if (pageloading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      

      {/* Teacher Routes */}
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

      {/* Student Routes */}
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

      {/* Admin Routes */}
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
        path="/admin/addNewStudent"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddNewStudent />
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

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const Landing = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default Landing;
