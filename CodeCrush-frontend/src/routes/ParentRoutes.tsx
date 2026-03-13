import { Routes, Route } from "react-router-dom";

import ParentLayout from "../layouts/ParentLayout";

import ParentDashboard from "../features/Parent/pages/ParentDashboard/ParentDashboard";
import AddChild from "../features/Parent/pages/AddChild/AddChild";
import ChildProgressPage from "../features/Parent/pages/ChildProgress/ChildProgress";

import AuthPage from "../features/Auth/pages/AuthPage/AuthPage";
import OTPPage from "../features/Auth/pages/OTPPage/OTPPage";
import ResetPasswordPage from "../features/Auth/pages/ResetPasswordPage/ResetPasswordPage";

const ParentRoutes = () => {
  return (
    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/verify-otp" element={<OTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* PARENT PORTAL ROUTES */}
      <Route element={<ParentLayout />}>

        <Route path="/dashboard" element={<ParentDashboard />} />

        <Route path="/add-child" element={<AddChild />} />
        <Route path="/child" element={<ChildProgressPage />} />

      </Route>

    </Routes>
  );
};

export default ParentRoutes;