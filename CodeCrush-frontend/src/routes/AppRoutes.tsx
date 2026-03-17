import { BrowserRouter, Routes, Route } from "react-router-dom";
//import AuthPage from "../features/Auth/pages/AuthPage/AuthPage";
import ParentRoutes from "./ParentRoutes";
import ChildRoutes from "./ChildRoutes";
import AdminRoutes from "./AdminRoutes";
import LoadingPage from "../features/Auth/pages/LoadingPage/LoadingPage";
import HomePage from "../features/Auth/pages/HomePage/HomePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element = { <LoadingPage />}/>
                <Route path="/home" element = { <HomePage/> } />
                <Route path="/parent/*" element = { <ParentRoutes/> } />
                <Route path="/child/*" element = { <ChildRoutes/> } />
                <Route path="/admin/*" element = { <AdminRoutes/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;