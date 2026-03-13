import { Outlet } from "react-router-dom"
import BG from "../assets/authBG.png"
import logo from "../assets/parentPortal.png"

const ParentLayout = () => {
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

        {/* Logout Button Right */}
        <button
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
  )
}

export default ParentLayout