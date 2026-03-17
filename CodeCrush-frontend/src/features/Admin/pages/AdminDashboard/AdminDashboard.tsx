// src/features/Admin/pages/AdminDashboard/AdminDashboard.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logo from "../../../../assets/logo.png";
import robotMain from "../../../../assets/loginRobo.png"; // Standing robot
import robotMini from "../../../../assets/playingRobo2.png"; // Mini floating robot
import BG from "../../../../assets/AdminBG.png";

import { adminLogout } from "../../AdminSlice";
import { adminLogoutApi } from "../../api/adminLogout";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingLogout, setLoadingLogout] = useState(false);

  // Logout handler
const handleLogout = async () => {
  setLoadingLogout(true);
  try {
    // 1. Attempt server-side logout
    await adminLogoutApi(); 
  } catch (err: any) {
    // 2. If the token was already expired, the server might return 401.
    // We catch it here so the code doesn't crash.
    console.warn("Server session already cleared or expired.");
  }

  // 3. ALWAYS clear local state and redirect, regardless of API success
  dispatch(adminLogout());
  toast.success("Logged out successfully");
  navigate("/admin");
  setLoadingLogout(false);
};

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center font-sans p-4"
      style={{ backgroundImage: `url(${BG})` }}
    >
      {/* Container Card */}
      <div className="relative bg-white/20 backdrop-blur-md border-2 border-blue-400/50 rounded-[40px] w-full max-w-[1000px] p-6 md:p-10 shadow-2xl flex flex-col items-center">
        
        {/* Logout Button */}
        <div className="flex justify-end w-full mb-4">
          <button
            onClick={handleLogout}
            disabled={loadingLogout}
            className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition transform active:translate-y-1 ${
              loadingLogout ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </div>

        {/* Floating Mini Robot */}
        <img
          src={robotMini}
          className="absolute -top-12 -left-12 w-24 md:w-32 animate-float"
          alt="Mini Robo"
        />

        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} className="w-32 md:w-40 mb-4" alt="Code Crush Logo" />
          <div className="bg-[#8b5cf6] px-10 py-2 rounded-full border border-white/30 shadow-lg">
            <h1 className="text-white font-bold tracking-widest text-lg md:text-xl uppercase">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* USER CONTROL */}
          <div onClick={() => navigate("/admin/parents")} className="bg-[#60a5fa] rounded-[30px] p-6 flex flex-col items-center text-white shadow-lg border-b-4 border-blue-600">
            <h3 className="font-bold text-xl mb-4 tracking-wider">USER CONTROL</h3>
            <div className="bg-white/90 rounded-2xl p-4 w-full flex flex-col items-center text-blue-600">
              <span className="text-5xl font-black">120</span>
              <span className="font-bold tracking-tighter mb-2">ACTIVE USERS</span>
              <span className="text-xs font-bold text-blue-400 mb-4">500 ACTIVE CHILDREN</span>
              <button className="bg-[#8b5cf6] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-[0px_4px_0px_0px_#6d28d9] active:translate-y-1 active:shadow-none transition-all uppercase">
                Manage Users
              </button>
            </div>
          </div>

          {/* GAME CONTROL */}
          <div className="bg-[#60a5fa] rounded-[30px] p-6 flex flex-col items-center text-white shadow-lg border-b-4 border-blue-600">
            <h3 className="font-bold text-xl mb-4 tracking-wider">GAME CONTROL</h3>
            <div className="bg-white/90 rounded-2xl p-4 w-full flex flex-col items-center text-blue-600">
              <span className="text-5xl font-black">40</span>
              <span className="font-bold text-center leading-tight mb-4">LEVELS<br />IN 4 GAMES</span>
              <button className="bg-[#8b5cf6] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-[0px_4px_0px_0px_#6d28d9] active:translate-y-1 active:shadow-none transition-all uppercase">
                Add New Levels
              </button>
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-[#60a5fa] rounded-[30px] p-6 flex flex-col items-center text-white shadow-lg border-b-4 border-blue-600">
            <h3 className="font-bold text-xl mb-4 tracking-wider uppercase">Security</h3>
            <div className="bg-white/90 rounded-2xl p-4 w-full flex flex-col items-center gap-3">
              <input 
                type="password" 
                placeholder="ADMIN PASSWORD" 
                className="w-full bg-white border border-gray-200 rounded-lg py-2 text-center text-xs font-bold text-gray-400 outline-none shadow-inner"
              />
              <input 
                type="password" 
                placeholder="NEW PASSWORD" 
                className="w-full bg-white border border-gray-200 rounded-lg py-2 text-center text-xs font-bold text-gray-400 outline-none shadow-inner"
              />
              <button className="bg-[#48a14d] text-white px-10 py-2 rounded-full font-bold text-sm shadow-[0px_4px_0px_0px_#2d6a31] active:translate-y-1 active:shadow-none transition-all uppercase">
                Change
              </button>
            </div>
          </div>

          {/* ANALYTICS */}
          <div className="bg-[#60a5fa] rounded-[30px] p-6 flex flex-col items-center text-white shadow-lg border-b-4 border-blue-600">
            <h3 className="font-bold text-xl mb-4 tracking-wider uppercase">Analytics</h3>
            <div className="bg-white/90 rounded-2xl p-4 w-full flex flex-col items-center text-blue-600">
              <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase">View Report</h4>
              <div className="flex items-end justify-center gap-1 h-20 w-full px-4 mb-4">
                <div className="w-3 bg-blue-300 rounded-t h-[40%]"></div>
                <div className="w-3 bg-blue-500 rounded-t h-[70%]"></div>
                <div className="w-3 bg-blue-400 rounded-t h-[50%]"></div>
                <div className="w-3 bg-blue-600 rounded-t h-[90%]"></div>
                <div className="w-3 bg-blue-200 rounded-t h-[30%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Standing Robot */}
        <img 
          src={robotMain} 
          className="absolute -right-16 -bottom-4 w-48 md:w-64 lg:w-72 hidden lg:block drop-shadow-2xl" 
          alt="Standing Robo" 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;