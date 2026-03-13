import { useState, useEffect } from "react";
import BG from "../../../../assets/authBG.png";
import logo from "../../../../assets/parentPortal.png";
import icon from "../../../../assets/parentIcon.png";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

 const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (isLogin) {
    navigate("/parent/dashboard");
  } else {
    navigate("/parent/verify-otp");
  }
};

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-4 font-sans overflow-hidden">

      {/* Background */}
      <img
        src={BG}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Circuit Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 100px 100px, 100px 100px",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-md">

        {/* Logo */}
        <div
          className={`mb-3 transition-all duration-700 ${
            animate
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <img
            src={logo}
            alt="Parent Portal"
            className="w-48 md:w-48 drop-shadow-xl"
          />
        </div>

        {/* Card */}
        <div
          className={`w-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-2xl px-6 py-6 sm:px-8 sm:py-8 flex flex-col items-center transition-all duration-700 ${
            animate
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >

          {/* Icon */}
          <div className="w-20 h-20 mb-3 flex items-center justify-center">
            <img
              src={icon}
              alt="Parent"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="font-mochiy text-[#1a3a6d] text-lg sm:text-xl font-bold uppercase text-center mb-4">
            {isLogin ? "Welcome Back Parent" : "Create Your Account"}
          </h2>

          {/* Form */}
          <form
            className="w-full space-y-3"
            onSubmit={handleSubmit}
          >

            {/* Parent Name */}
            <div
              className={`transition-all duration-300 origin-top ${
                !isLogin
                  ? "max-h-20 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <input
                type="text"
                placeholder="Parent name"
                className="w-full font-mochiy bg-[#e1f5fe] rounded-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Parent email"
              className="w-full font-mochiy bg-[#e1f5fe] rounded-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full font-mochiy bg-[#e1f5fe] rounded-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-3 text-gray-500 text-sm"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {/* Confirm Password */}
            <div
              className={`transition-all duration-300 origin-top ${
                !isLogin
                  ? "max-h-20 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full font-mochiy bg-[#e1f5fe] rounded-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Forgot Password */}
            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-[10px] font-mochiy text-gray-400 hover:text-blue-600 uppercase"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button 
            type="submit"
            className="w-full bg-[#006837] hover:bg-[#004d29] text-white font-mochiy py-3 rounded-full text-base shadow-xl active:scale-95 transition">
              {isLogin ? "Login Securely" : "Sign Up Securely"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm font-mochiy text-gray-900">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>

            <button
              onClick={toggleAuth}
              className="text-blue-700 underline mt-1 font-mochiy text-sm"
            >
              {isLogin ? "Sign up here" : "Login here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;