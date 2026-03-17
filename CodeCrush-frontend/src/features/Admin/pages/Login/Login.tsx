import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logo from "../../../../assets/logo.png";
import robot from "../../../../assets/loginRobo.png";
import BG from "../../../../assets/AdminBG.png";

import { adminLogin } from "../../api/adminLogin";
import { setAdminCredentials } from "../../AdminSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const data = await adminLogin(email, password);

      // Dispatch to Redux store
      dispatch(
        setAdminCredentials({
          admin: data.admin,
          accessToken: data.accessToken,
        })
      );

      toast.success("Login successful!");
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center font-sans"
      style={{ backgroundImage: `url(${BG})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Login Card */}
      <div className="relative bg-white/20 backdrop-blur-lg border border-blue-400 rounded-3xl w-[90%] max-w-[650px] p-10 md:p-12 shadow-xl flex flex-col items-center">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} className="w-24 md:w-28 mb-3 animate-bounceSlow" />
          <h2 className="bg-blue-300 text-white font-mochiy text-xl px-6 py-2 rounded-lg tracking-wide">
            ADMIN PORTAL
          </h2>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-[400px]"
        >
          <input
            type="text"
            placeholder="ADMIN USERNAME"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white font-mochiy rounded-lg py-4 px-5 text-center font-semibold text-gray-600 outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="password"
            placeholder="ADMIN PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white font-mochiy rounded-lg py-4 px-5 text-center font-semibold text-gray-600 outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 font-mochiy hover:bg-blue-700 hover:scale-105 transition transform duration-300 text-white py-4 rounded-lg text-lg font-bold ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
      </div>

      {/* Floating Robot */}
      <img
        src={robot}
        className="absolute right-4 bottom-0 w-40 sm:w-48 md:w-56 lg:w-72 xl:w-80 animate-float"
      />
    </div>
  );
}