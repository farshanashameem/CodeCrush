import { Routes, Route } from "react-router-dom";
import ChildDashboard from "../features/Child/pages/ChildDashboard/ChildDashBoard";

const ChildRoutes = () => {
    return(
        <Routes>
            <Route path="dashboard" element = { <ChildDashboard/> } />
        </Routes>
    )
};

export default ChildRoutes;
