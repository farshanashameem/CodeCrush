import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../features/Admin/pages/AdminDashboard/AdminDashboard";

const AdminRoutes = () => {
    return (
        <Routes>
        <Route path="dashboard" element = { <AdminDashboard/> } />
    </Routes>
    );
};

export default AdminRoutes;