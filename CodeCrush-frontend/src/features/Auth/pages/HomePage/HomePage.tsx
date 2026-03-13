import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"

import BGVideo from "../../../../assets/home-bg.mp4"
import Music from "../../../../assets/bg-music.mp3"

import Logo from "../../../../assets/logo.png"
import Kid1 from "../../../../assets/boy1.png"
import Kid2 from "../../../../assets/girl1.png"
import Kid3 from "../../../../assets/boy2.png"
import Kid4 from "../../../../assets/boy3.png"
import Start from "../../../../assets/start.png"
import Begin from "../../../../assets/Begin.png"

const HomePage = () => {
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [soundOn, setSoundOn] = useState(false)

  const toggleSound = () => {
    if (!audioRef.current) return

    if (soundOn) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setSoundOn(!soundOn)
  }

  const handleStart = () => {
    navigate("/parent/auth")
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-sky-300 font-[Baloo_2]">

      {/* Background blurred video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 z-[-20]"
      >
        <source src={BGVideo} type="video/mp4" />
      </video>

      {/* Main video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain z-0"
      >
        <source src={BGVideo} type="video/mp4" />
      </video>

      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src={Music} type="audio/mp3" />
      </audio>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="absolute top-6 right-6 z-50 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-lg hover:scale-110 transition"
      >
        {soundOn ? "🔊" : "🔇"}
      </button>

      {/* Logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
        <img src={Logo} alt="CodeCrush Logo" className="w-[160px] md:w-[200px]" />
      </div>

      {/* Floating Characters (only on large screens) */}
      <img src={Kid1} alt="kid" className="hidden lg:block absolute left-[5%] top-[40%] w-[160px] xl:w-[240px] animate-bounce z-10"/>
      <img src={Kid2} alt="kid" className="hidden lg:block absolute right-[5%] top-[30%] w-[160px] xl:w-[240px] animate-bounce z-10"/>
      <img src={Kid3} alt="kid" className="hidden lg:block absolute right-[12%] bottom-[10%] w-[160px] xl:w-[240px] animate-bounce z-10"/>
      <img src={Kid4} alt="kid" className="hidden lg:block absolute left-[10%] bottom-[8%] w-[160px] xl:w-[240px] animate-bounce z-10"/>

    {/* Hero Section */}
<div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4">
  
  {/* Start Adventure Image */}
  <img
    src={Start}
    alt="Start Adventure"
    className=" w-[220px] sm:w-[280px] md:w-[360px] lg:w-[480px] xl:w-[520px] animate-bounce"
  />

  <img
    src={ Begin }
    alt="Begin Game"
    onClick={handleStart}
    className="mt-8 cursor-pointer w-[180px] sm:w-[250px] md:w-[270px] lg:w-[350px] hover:scale-110 transition"
  />

</div>

    </div>
  )
}

export default HomePage