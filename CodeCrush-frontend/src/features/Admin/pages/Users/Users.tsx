// src/features/Admin/pages/Users/Users.tsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import logo from "../../../../assets/logo.png";
import BG from "../../../../assets/AdminBG.png";
import { getParentsApi } from "../../api/getUsers";
import { toggleBlockParent, toggleDeleteParent } from "../../api/userActions";
import Modal from "../../../../components/Modal";// import your modal

interface User {
  id: string;
  name: string;
  email: string;
  childrenIds: string[];
  isBlocked: boolean;
  isDeleted: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<"block" | "delete" | null>(null);

  // Fetch parents on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getParentsApi();
        setUsers(data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle modal confirm
  const handleConfirm = async () => {
    if (!selectedUserId || !modalAction) return;

    try {
      if (modalAction === "block") {
        const data = await toggleBlockParent(selectedUserId);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUserId ? { ...u, isBlocked: data.parent.isBlocked } : u
          )
        );
        toast.success(data.message);
      } else if (modalAction === "delete") {
        const data = await toggleDeleteParent(selectedUserId);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUserId ? { ...u, isDeleted: data.parent.isDeleted } : u
          )
        );
        toast.success(data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    } finally {
      setIsModalOpen(false);
      setSelectedUserId(null);
      setModalAction(null);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center font-sans p-4"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="relative bg-white/20 backdrop-blur-md border-2 border-blue-400/50 rounded-[40px] w-full max-w-[1100px] p-6 md:p-10 shadow-2xl flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} className="w-32 md:w-40 mb-4" alt="Code Crush" />
          <div className="bg-[#8b5cf6] px-12 py-1.5 rounded-full border border-white/30 shadow-lg">
            <h1 className="text-white font-bold tracking-widest text-lg uppercase">
              Users
            </h1>
          </div>
        </div>

        {/* Search */}
        <div className="w-full flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-white rounded-2xl py-4 px-8 text-xl font-semibold text-gray-500 outline-none shadow-inner"
          />
          <button className="bg-blue-800 hover:bg-blue-900 text-white px-12 py-4 rounded-2xl font-black text-xl tracking-widest shadow-[0px_4px_0px_0px_#1e3a8a] active:translate-y-1 active:shadow-none transition-all">
            Search
          </button>
        </div>

        {/* Table */}
        <div className="w-full bg-white/90 rounded-3xl overflow-hidden shadow-xl border border-blue-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-800 text-white uppercase tracking-widest text-sm md:text-base">
                <th className="py-4 px-6 font-bold">User</th>
                <th className="py-4 px-6 font-bold text-center">No. of Children</th>
                <th className="py-4 px-6 font-bold text-center">Status</th>
                <th className="py-4 px-6 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500 font-bold">
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500 font-bold">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${index % 2 === 0 ? "bg-gray-50/50" : "bg-white"} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="py-5 px-6 font-bold text-gray-700">{user.name}</td>
                    <td className="py-5 px-6 text-center font-bold text-gray-700">{user.childrenIds.length}</td>
                    <td className="py-5 px-6 text-center">
                      <span className={user.isBlocked ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-center gap-6 font-bold text-sm">
                        <button
                          className="text-red-400 hover:text-red-600 transition-colors"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setModalAction("block");
                            setIsModalOpen(true);
                          }}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          className="text-red-400 hover:text-red-600 transition-colors"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setModalAction("delete");
                            setIsModalOpen(true);
                          }}
                        >
                          {user.isDeleted ? "Restore" : "Delete"}
                        </button>
                        <button className="text-blue-500 hover:text-blue-700 transition-colors">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-gray-200/80 py-3 flex justify-center items-center gap-4 text-sm font-bold text-gray-600">
            <span className="text-blue-600 border-b-2 border-blue-600 px-1 cursor-pointer">1</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">next</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Confirm Action"
        message={
          modalAction === "block"
            ? "Are you sure you want to block/unblock this user?"
            : "Are you sure you want to delete/restore this user?"
        }
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default Users;