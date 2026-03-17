import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BG from "../../../../assets/authBG.png";
import logo from "../../../../assets/parentPortal.png";
import icon from "../../../../assets/parentIcon.png";
import robotLeft from "../../../../assets/puzzleRobo.png";
import robotRight from "../../../../assets/mailRobo.png";

import { verifyOTP } from "../../api/verifyOTP";
import { resendOTP } from "../../api/ResendOTPAction";

import "./OTPPage.css";

const OTPPage = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<HTMLInputElement[]>([]);

  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [shake, setShake] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  // Focus first input on mount
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // Load expiry and start timer if needed
  useEffect(() => {
    const expiry = localStorage.getItem("otpExpiry");
    if (!expiry) return;

    let remaining = Math.max(Math.floor((parseInt(expiry) - Date.now()) / 1000), 0);
    setTimer(remaining);
    setCanResend(remaining <= 0);

    if (remaining > 0) {
      const interval = setInterval(() => {
        remaining -= 1;
        setTimer(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          setCanResend(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  // Handle OTP input change
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  // Handle backspace and Enter key
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }

    if (e.key === "Enter") {
      handleVerify();
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 4) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    try {
      setLoadingVerify(true);
      const result = await verifyOTP(code);

      if (result.success) {
        toast.success("Account verified successfully 🎉");
        localStorage.removeItem("otpExpiry");
        localStorage.removeItem("parentEmail");
        navigate("/parent/auth");
      } else {
        toast.error(result.message);
        setOtp(["", "", "", ""]);
        inputs.current[0]?.focus();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to verify OTP");
    } finally {
      setLoadingVerify(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    const email = localStorage.getItem("parentEmail");
    if (!email) {
      toast.error("Email not found. Please go back and re-enter your email.");
      return;
    }

    try {
      setLoadingResend(true);

      // Call API first
      const result = await resendOTP(email);

      if (result.success) {
        toast.success("OTP resent successfully 🎉");

        // Set new expiry if returned
        if (result.expiresAt) {
          localStorage.setItem("otpExpiry", result.expiresAt.toString());
        }

        // Start countdown
        setTimer(60);
        setCanResend(false);

        let remaining = 60;
        const interval = setInterval(() => {
          remaining -= 1;
          setTimer(remaining);
          if (remaining <= 0) {
            clearInterval(interval);
            setCanResend(true);
          }
        }, 1000);
      } else {
        toast.error(result.message);
        setCanResend(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend OTP");
      setCanResend(true);
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Background */}
      <img src={BG} className="absolute inset-0 w-full h-full object-cover" />

      {/* Puzzle animation */}
      {[...Array(5)].map((_, i) => <div key={i} className="puzzle">🧩</div>)}

      {/* Robots */}
      <img src={robotLeft} className="absolute left-8 bottom-20 w-48 hidden lg:block robot-float" />
      <img src={robotRight} className="absolute right-8 bottom-16 w-48 hidden lg:block robot-float robot-blink" />

      {/* Main container */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-lg px-4">
        <img src={logo} className="w-52 mb-6 drop-shadow-lg" />

        <div className="w-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-[0_0_40px_rgba(0,0,0,0.2)] px-10 py-10 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <img src={icon} className="w-16" />
          </div>

          <h2 className="font-mochiy text-xl text-gray-900 mb-8">
            Enter the 4 digit code sent to your email
          </h2>

          {/* OTP inputs */}
          <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
            <div className={`flex justify-center gap-5 mb-8 ${shake ? "animate-shake" : ""}`}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { if (el) inputs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-16 h-16 text-center text-2xl font-bold rounded-xl outline-none transition-all duration-200 tracking-widest
                    ${activeIndex === index
                      ? "bg-white ring-4 ring-blue-400 scale-110"
                      : "bg-blue-100"
                    }`}
                />
              ))}
            </div>

            {/* Verify button */}
            <button
              type="submit"
              disabled={loadingVerify}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-3 rounded-full shadow-xl transition transform hover:scale-105 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingVerify && (
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
              VERIFY
            </button>
          </form>

          {/* Timer / Resend */}
          <div className="mt-6 text-sm font-mochiy text-gray-800">
            {timer > 0 ? (
              <p>Resend OTP in <span className="font-bold">{timer}s</span></p>
            ) : (
              <button
                onClick={handleResend}
                disabled={loadingResend}
                className="text-blue-700 underline hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingResend ? "Resending..." : "Didn't get the code? Resend"}
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default OTPPage;