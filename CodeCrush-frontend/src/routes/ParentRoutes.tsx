import { Routes, Route } from "react-router-dom";

import ParentLayout from "../layouts/ParentLayout";
import PrivateRoute from "../components/PrivateRoute";

import ParentDashboard from "../features/Parent/pages/ParentDashboard/ParentDashboard";
import AddChild from "../features/Parent/pages/AddChild/AddChild";
import ChildProgressPage from "../features/Parent/pages/ChildProgress/ChildProgress";

import AuthPage from "../features/Auth/pages/AuthPage/AuthPage";
import OTPPage from "../features/Auth/pages/OTPPage/OTPPage";
import ResetPasswordPage from "../features/Auth/pages/ResetPasswordPage/ResetPasswordPage";
import EditChildPage from "../features/Parent/pages/EditChildpage";

const ParentRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC AUTH ROUTES */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/verify-otp" element={<OTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* PROTECTED PARENT ROUTES */}
      <Route
        element={
          <PrivateRoute allowedRoles={["parent"]}>
            <ParentLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<ParentDashboard />} />
        <Route path="/add-child" element={<AddChild />} />
        <Route path="/child/:id" element={<ChildProgressPage />} />
        <Route path="/child/edit/:id" element = { <EditChildPage /> }/>
      </Route>
    </Routes>
  );
};

export default ParentRoutes;