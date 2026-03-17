import { useState, useEffect } from "react";
import BG from "../../../../assets/authBG.png";
import logo from "../../../../assets/parentPortal.png";
import icon from "../../../../assets/parentIcon.png";
import { useNavigate } from "react-router-dom";
import { loginUser, signupParent } from "../../api/AuthActions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../app/store";
import toast from "react-hot-toast";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    try {
      if (isLogin) {
        if (!email.trim() || !password.trim()) {
          toast.error("Please enter email and password");
          return;
        }

        const result = await dispatch(loginUser(email, password));

        if (result.success && result.user && result.accessToken) {
          toast.success("Login successful 🎉");
          navigate("/parent/dashboard");
        } else {
          toast.error(result.message);
        }
      } else {
        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
          toast.error("Please fill all fields");
          return;
        }

        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        const result = await dispatch(
          signupParent(name, email, password, confirmPassword)
        );

        if (result.success) {
          if (result.expiresAt) {
            localStorage.setItem("otpExpiry", result.expiresAt.toString());
          }

          localStorage.setItem("parentEmail", email);
          toast.success("OTP sent to your email");
          navigate("/parent/verify-otp", { state: { email } });
        } else {
          console.log(result);
          toast.error(result.message);
        }
      }
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-4 font-sans overflow-hidden">
      <img
        src={BG}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

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

      <div className="relative z-20 flex flex-col items-center w-full max-w-md">
        <div
          className={`mb-3 transition-all duration-700 ${
            animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <img
            src={logo}
            alt="Parent Portal"
            className="w-48 md:w-48 drop-shadow-xl"
          />
        </div>

        <div
          className={`w-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-2xl px-6 py-6 sm:px-8 sm:py-8 flex flex-col items-center transition-all duration-700 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="w-20 h-20 mb-3 flex items-center justify-center">
            <img
              src={icon}
              alt="Parent"
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="font-mochiy text-[#1a3a6d] text-lg sm:text-xl font-bold uppercase text-center mb-4">
            {isLogin ? "Welcome Back Parent" : "Create Your Account"}
          </h2>

          <form className="w-full space-y-3" onSubmit={handleSubmit}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full font-mochiy bg-[#e1f5fe] rounded-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <input
              type="email"
              placeholder="Parent email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full font-mochiy bg-[#e1f5fe] rounded-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full font-mochiy bg-[#e1f5fe] rounded-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

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

            {/* ✅ Submit Button with spinner */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#006837] hover:bg-[#004d29] text-white font-mochiy py-3 rounded-full text-base shadow-xl active:scale-95 transition flex items-center justify-center gap-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login Securely"
                : "Sign Up Securely"}
            </button>
          </form>

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