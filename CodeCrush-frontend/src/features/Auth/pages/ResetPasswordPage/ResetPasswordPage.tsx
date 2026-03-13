import { useState } from "react";
import BG from "../../../../assets/authBG.png";
import logo from "../../../../assets/parentPortal.png";
import icon from "../../../../assets/parentIcon.png";

const ResetPasswordPage = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("New Password:", password);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Background */}
      <img
        src={BG}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-md px-4">

        {/* Logo */}
        <img
          src={logo}
          className="w-52 mb-6 drop-shadow-lg"
        />

        {/* Card */}
        <div className="w-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-2xl px-10 py-10 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <img src={icon} className="w-16" />
          </div>

          {/* Title */}
          <h2 className="font-mochiy text-xl text-[#1a3a6d] mb-8">
            Change Password
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#d7e9f5] rounded-full py-3 px-6 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-3 text-gray-500"
              >
                👁
              </button>
            </div>

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#d7e9f5] rounded-full py-3 px-6 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#006400] hover:bg-[#004d00] text-white font-mochiy py-3 rounded-full text-lg shadow-xl transition transform hover:scale-105"
            >
              Reset Password
            </button>

          </form>

          {/* Back Link */}
          <p className="mt-5 text-sm text-gray-700">
            Go back to home
          </p>

        </div>

      </div>
    </div>
  );
};

export default ResetPasswordPage;