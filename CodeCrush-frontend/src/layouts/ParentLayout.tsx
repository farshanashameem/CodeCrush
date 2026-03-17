import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import BG from "../assets/authBG.png";
import logo from "../assets/parentPortal.png";

import { logout } from "../features/Auth/authSlice";
import { LogoutAction } from "../features/Auth/api/LogoutAction";

const ParentLayout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();   // ✅ missing

  const handleLogout = async () => {
    try {
      await LogoutAction();
    } catch (error) {
      console.log(error);
    }

    dispatch(logout());
    navigate("/parent/login");
  };

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <img
        src={BG}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Header */}
      <div className="relative z-20 flex items-center justify-center p-6">

        {/* Logo Center */}
        <img src={logo} className="w-44" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}   // ✅ missing
          className="absolute right-8 top-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Page Content */}
      <div className="relative z-20">
        <Outlet />
      </div>

    </div>
  );
};

export default ParentLayout;