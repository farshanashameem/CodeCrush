import { useState, useRef, useEffect } from "react";
import BG from "../../../../assets/authBG.png";
import logo from "../../../../assets/parentPortal.png";
import icon from "../../../../assets/parentIcon.png";
import robotLeft from "../../../../assets/puzzleRobo.png";
import robotRight from "../../../../assets/mailRobo.png";


import "./OTPPage.css";

const OTPPage = () => {

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<HTMLInputElement[]>([]);

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 3) {
      setActiveIndex(index + 1);
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }

  };

  const handleVerify = () => {

    const code = otp.join("");

    if (code.length !== 4) {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);

      return;
    }

    console.log("OTP:", code);

  };

  const handleResend = () => {

    setTimer(60);
    setCanResend(false);

    console.log("Resend OTP");

  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Background */}
      <img
        src={BG}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Floating Puzzle Pieces */}
<div className="puzzle">🧩</div>
<div className="puzzle">🧩</div>
<div className="puzzle">🧩</div>
<div className="puzzle">🧩</div>
<div className="puzzle">🧩</div>

      {/* Left Robot */}
      <img
  src={robotLeft}
  className="absolute left-8 bottom-20 w-48 hidden lg:block robot-float"
/>

      {/* Right Robot */}
      <img
  src={robotRight}
  className="absolute right-8 bottom-16 w-48 hidden lg:block robot-float robot-blink"
/>

      {/* Main Container */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-lg px-4">

        {/* Logo */}
        <img
          src={logo}
          className="w-52 mb-6 drop-shadow-lg"
        />

        {/* Card */}
        <div className="w-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-[0_0_40px_rgba(0,0,0,0.2)] px-10 py-10 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <img src={icon} className="w-16" />
          </div>

          {/* Title */}
          <h2 className="font-mochiy text-xl text-gray-900 mb-8">
            Enter the 4 digit code sent to your email
          </h2>

          {/* OTP INPUTS */}
          <div className={`flex justify-center gap-5 mb-8 ${shake ? "animate-shake" : ""}`}>

            {otp.map((digit, index) => (

              <input
                key={index}
                ref={(el) => {
                  if (el) inputs.current[index] = el;
                }}

                type="text"
                maxLength={1}

                value={digit}

                onChange={(e) =>
                  handleChange(e.target.value, index)
                }

                onFocus={() => setActiveIndex(index)}

                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }

                className={`w-16 h-16 text-center text-2xl font-bold rounded-xl outline-none transition-all duration-200 tracking-widest
                ${activeIndex === index
                    ? "bg-white ring-4 ring-blue-400 scale-110"
                    : "bg-blue-100"
                  }`}
              />

            ))}

          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-3 rounded-full shadow-xl transition transform hover:scale-105"
          >
            VERIFY
          </button>

          {/* Timer */}
          <div className="mt-6 text-sm font-mochiy text-gray-800">

            {!canResend ? (

              <p>
                Resend OTP in <span className="font-bold">{timer}s</span>
              </p>

            ) : (

              <button
                onClick={handleResend}
                className="text-blue-700 underline hover:text-blue-900"
              >
                Didn't get the code? Resend
              </button>

            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default OTPPage;