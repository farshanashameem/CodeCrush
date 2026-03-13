import { useNavigate } from "react-router-dom"
import mouseTracker from "../../../../assets/games/mouseTrackers.png"
import colorSorter from "../../../../assets/games/Colour Sorter Safari.png"
import typingTitans from "../../../../assets/games/TYPING TITANS.png"
import picturepuzzler from "../../../../assets/games/PICTURE PUZZLERS.png"

const ChildProgressPage = () => {
  const navigate = useNavigate()
  const child = { name: "Leo", age: 10 }

  const games = [
    { name: "Mouse Tracker", level: "5.2", progress: 75, stat: "18s Speed", bestScore: "9 / 10", lastPlayed: "Today", totalTime: "2h", stars: 4, image: mouseTracker, color: "bg-orange-400" },
    { name: "Typing Titans", level: "5.1", progress: 72, stat: "25 WPM", bestScore: "8 / 10", lastPlayed: "Yesterday", totalTime: "1.5h", stars: 3, image: typingTitans, color: "bg-blue-400" },
    { name: "Color Sorter", level: "5.0", progress: 70, stat: "18s Sort", bestScore: "10 / 10", lastPlayed: "Today", totalTime: "1h", stars: 5, image: colorSorter, color: "bg-purple-400" },
    { name: "Picture Puzzle", level: "5.3", progress: 78, stat: "18s Solve", bestScore: "9 / 10", lastPlayed: "2 days ago", totalTime: "2.3h", stars: 4, image: picturepuzzler, color: "bg-pink-400" }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-8">
      
      {/* 1. Page Header (Inside the Layout) */}
      {/* Page Header */}
<div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-white/20 pb-6">
  <div>
    <button
      onClick={() => navigate(-1)}
      className="text-blue-200 font-mochiy text-[10px] uppercase hover:text-white transition-colors mb-2"
    >
      ← Back to Dashboard
    </button>
    <h1 className="font-mochiy text-3xl text-white uppercase tracking-tight">
      {child.name}'s <span className="text-orange-400">Activity</span>
    </h1>
  </div>

  {/* Quick Actions - Including Delete */}
  <div className="flex flex-wrap gap-2">
    <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl font-baloo text-xs font-bold uppercase border border-white/10 transition-all flex items-center gap-2">
      <span>✏️</span> Edit
    </button>
    
    <button className="bg-yellow-500/80 hover:bg-yellow-500 text-blue-900 px-5 py-2 rounded-xl font-baloo text-xs font-bold uppercase transition-all flex items-center gap-2">
      <span>⏸</span> Block
    </button>

    <button 
      onClick={() => {
        if(window.confirm(`Are you sure you want to delete ${child.name}?`)) {
          // Add your delete logic here
          console.log("Delete triggered");
        }
      }}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-baloo text-xs font-bold uppercase transition-all shadow-lg flex items-center gap-2"
    >
      <span>🗑️</span> Delete
    </button>
  </div>
</div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-white/95 rounded-[32px] shadow-2xl overflow-hidden flex flex-col hover:translate-y-[-5px] transition-transform duration-300"
          >
            {/* Game Preview */}
            <div className="h-32 relative">
              <img src={game.image} className="w-full h-full object-cover" alt={game.name} />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-mochiy">
                LVL {game.level}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h2 className="font-mochiy text-gray-800 text-sm mb-2 truncate uppercase text-center">
                {game.name}
              </h2>

              {/* Stars display */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < game.stars ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                ))}
              </div>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] font-mochiy text-gray-400 mb-1">
                  <span>PROGRESS</span>
                  <span>{game.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${game.color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${game.progress}%` }} />
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                  <span className="text-[9px] font-baloo font-bold text-gray-400 uppercase">Best Score</span>
                  <span className="text-[10px] font-mochiy text-blue-900">{game.bestScore}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                  <span className="text-[9px] font-baloo font-bold text-gray-400 uppercase">Total Time</span>
                  <span className="text-[10px] font-mochiy text-blue-900">{game.totalTime}</span>
                </div>
              </div>
              
              <p className="text-center text-[9px] font-baloo text-gray-400 font-bold uppercase mt-3 italic">
                Last played: {game.lastPlayed}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Global Call to Action */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50">
        <button className="w-full bg-[#006837] hover:bg-[#004d29] text-white font-mochiy py-4 rounded-full text-lg shadow-[0_8px_30px_rgba(0,104,55,0.4)] border-b-4 border-[#003d20] flex items-center justify-center gap-3 transition-all active:scale-95 group">
          <span className="group-hover:rotate-12 transition-transform">🎮</span>
          START PLAYING WITH {child.name.toUpperCase()}
        </button>
      </div>

    </div>
  )
}

export default ChildProgressPage;