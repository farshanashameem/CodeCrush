import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getChild } from "../../api/getChild";
import type { Child, ChildGame } from "../../types";
import { toggleBlockChild, toggleDeleteChild } from "../../api/ChildActions";
import Modal from "../../../../components/Modal";

import mouseTracker from "../../../../assets/games/mouseTrackers.png";
import colorSorter from "../../../../assets/games/Colour Sorter Safari.png";
import typingTitans from "../../../../assets/games/TYPING TITANS.png";
import picturepuzzler from "../../../../assets/games/PICTURE PUZZLERS.png";

const ALL_GAMES = [
  { name: "Mouse Tracker", color: "bg-orange-400", image: mouseTracker },
  { name: "Typing Titans", color: "bg-blue-400", image: typingTitans },
  { name: "Color Sorter", color: "bg-purple-400", image: colorSorter },
  { name: "Picture Puzzle", color: "bg-pink-400", image: picturepuzzler },
];

const ChildProgressPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [child, setChild] = useState<Child | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"block" | "delete" | null>(null);

  // Fetch child
  useEffect(() => {
    if (!id) return;
    const fetchChild = async () => {
      try {
        const result = await getChild(id);
        if (result.success) {
          setChild(result.data ?? null);
        } else {
          toast.error(result.message || "Failed to fetch child");
          navigate("/parent/dashboard");
        }
      } catch (error) {
        toast.error("Something went wrong");
        navigate("/parent/dashboard");
      }
    };
    fetchChild();
  }, [id, navigate]);

  if (!child) return <p className="text-center mt-10 text-white">Loading...</p>;

  // Map backend games by name for easy lookup
  const gamesMap: Record<string, ChildGame> = {};
  (child.games || []).forEach((g) => {
    gamesMap[g.name] = g;
  });

  // Modal confirm actions
  const handleConfirm = async () => {
    if (!child || !modalAction) return;

    try {
      if (modalAction === "block") {
        const data = await toggleBlockChild(child.id);
        toast.success(data.message);
        setChild((prev) => prev ? { ...prev, isBlocked: data.child.isBlocked } : prev);
      } else if (modalAction === "delete") {
        const data = await toggleDeleteChild(child.id);
        toast.success(data.message);
        setChild((prev) => prev ? { ...prev, isDeleted: data.child.isDeleted } : prev);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setModalOpen(false);
      setModalAction(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-8">

      {/* Header */}
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
          <p className="text-gray-200 mt-1">Age: {child.age}</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {/* Edit */}
          <button
            onClick={() => navigate(`/parent/child/edit/${child.id}`)}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl font-baloo text-xs font-bold uppercase border border-white/10 transition-all flex items-center gap-2"
          >
            <span>✏️</span> Edit
          </button>

          {/* Block/Unblock */}
          <button
            onClick={() => { setModalAction("block"); setModalOpen(true); }}
            className={`px-5 py-2 rounded-xl font-baloo text-xs font-bold uppercase flex items-center gap-2 transition-all
              ${child.isBlocked ? "bg-green-500/80 hover:bg-green-500 text-white" : "bg-yellow-500/80 hover:bg-yellow-500 text-blue-900"}`}
          >
            <span>⏸</span> {child.isBlocked ? "Unblock" : "Block"}
          </button>

          {/* Delete/Restore */}
          <button
            onClick={() => { setModalAction("delete"); setModalOpen(true); }}
            className={`px-5 py-2 rounded-xl font-baloo text-xs font-bold uppercase flex items-center gap-2 transition-all
              ${child.isDeleted ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
          >
            <span>🗑️</span> {child.isDeleted ? "Restore" : "Delete"}
          </button>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {ALL_GAMES.map((game, index) => {
          const played = gamesMap[game.name];
          return (
            <div
              key={index}
              className="bg-white/95 rounded-[32px] shadow-2xl overflow-hidden flex flex-col hover:translate-y-[-5px] transition-transform duration-300"
            >
              {/* Game Image */}
              <div className="h-32 relative">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
                {played && (
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-mochiy">
                    LVL {played.level}
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h2 className="font-mochiy text-gray-800 text-sm mb-2 truncate uppercase text-center">
                  {game.name}
                </h2>

                {played ? (
                  <>
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < (played.stars || 0) ? "text-yellow-400" : "text-gray-200"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] font-mochiy text-gray-400 mb-1">
                        <span>PROGRESS</span>
                        <span>{played.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`${game.color} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${played.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Data Rows */}
                    <div className="space-y-2 mt-auto">
                      <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                        <span className="text-[9px] font-baloo font-bold text-gray-400 uppercase">
                          Best Score
                        </span>
                        <span className="text-[10px] font-mochiy text-blue-900">{played.bestScore || "-"}</span>
                      </div>
                      <div className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                        <span className="text-[9px] font-baloo font-bold text-gray-400 uppercase">
                          Total Time
                        </span>
                        <span className="text-[10px] font-mochiy text-blue-900">{played.totalTime || "-"}</span>
                      </div>
                    </div>

                    <p className="text-center text-[9px] font-baloo text-gray-400 font-bold uppercase mt-3 italic">
                      Last played: {played.lastPlayed || "-"}
                    </p>
                  </>
                ) : (
                  <p className="text-center text-gray-400 italic mt-auto">Not yet played</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        title="Confirmation"
        message={`Are you sure you want to ${
          modalAction === "delete"
            ? child.isDeleted ? "restore" : "delete"
            : child.isBlocked ? "unblock" : "block"
        } ${child.name}?`}
        onConfirm={handleConfirm}
        onCancel={() => { setModalOpen(false); setModalAction(null); }}
        confirmText={modalAction === "delete" && child.isDeleted ? "Restore" : "Confirm"}
        cancelText="Cancel"
      />
    </div>
  );
};

export default ChildProgressPage;