import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../features/Admin/pages/AdminDashboard/AdminDashboard";
import Login from "../features/Admin/pages/Login/Login";
import Users from "../features/Admin/pages/Users/Users";
const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <Login/>} />
        <Route path="dashboard" element = { <AdminDashboard/> } />
        <Route path="parents" element= { <Users/>}/>
    </Routes>
    );
};

export default AdminRoutes;