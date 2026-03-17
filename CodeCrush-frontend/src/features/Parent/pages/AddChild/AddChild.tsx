import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addChild } from "../../api/addChild";
import { updateChild } from "../../api/ChildActions";
import type {
  AddChildProps,
  AddChildPayload,
  UpdateChildPayload,
} from "../../types";

// Avatars
import av1 from "../../../../assets/avatar/av1.jpg";
import av2 from "../../../../assets/avatar/av2.jpg";
import av3 from "../../../../assets/avatar/av3.jpg";
import av4 from "../../../../assets/avatar/av4.jpg";
import av5 from "../../../../assets/avatar/av5.jpg";
import av6 from "../../../../assets/avatar/av6.png";
import av7 from "../../../../assets/avatar/av7.jpg";
import av8 from "../../../../assets/avatar/av8.jpg";
import av9 from "../../../../assets/avatar/av9.png";
import av10 from "../../../../assets/avatar/av10.jpg";
import av11 from "../../../../assets/avatar/av11.png";
import av12 from "../../../../assets/avatar/av12.png";
import av13 from "../../../../assets/avatar/av13.png";
import av14 from "../../../../assets/avatar/av14.png";
import av15 from "../../../../assets/avatar/av15.jpg";
import av16 from "../../../../assets/avatar/av16.png";
import av17 from "../../../../assets/avatar/av17.png";
import av18 from "../../../../assets/avatar/av18.png";
import av19 from "../../../../assets/avatar/av19.png";
const avatars = [
  { id: "av1", img: av1 },
  { id: "av2", img: av2 },
  { id: "av3", img: av3 },
  { id: "av4", img: av4 },
  { id: "av5", img: av5 },
  { id: "av6", img: av6 },
  { id: "av7", img: av7 },
  { id: "av8", img: av8 },
  { id: "av9", img: av9 },
  { id: "av10", img: av10 },
  { id: "av11", img: av11 },
  { id: "av12", img: av12 },
  { id: "av13", img: av13 },
  { id: "av14", img: av14 },
  { id: "av15", img: av15 },
  { id: "av16", img: av16 },
  { id: "av17", img: av17 },
  { id: "av18", img: av18 },
  { id: "av19", img: av19 },
];

const AddChild = ({ child }: AddChildProps) => {
  const navigate = useNavigate();

  // Pre-fill state for edit
  const [name, setName] = useState(child?.name || "");
  const [age, setAge] = useState(child?.age.toString() || "");
  const [birthDate, setBirthDate] = useState(
    child?.dob ? child.dob.split("T")[0] : "",
  );
  const [selectedAvatar, setSelectedAvatar] = useState(child?.avatar || "");

  const selectedAvatarImage = avatars.find(
    (avatar) => avatar.id === selectedAvatar,
  )?.img;

  const isFormValid = name && age && selectedAvatar;

  const handleAddChild = async () => {
    if (!isFormValid) return;

    const avatarObj = avatars.find((a) => a.id === selectedAvatar);
    if (!avatarObj) {
      toast.error("Please select a valid avatar");
      return;
    }

    const avatarFileName = avatarObj.img.split("/").pop();
    if (!avatarFileName) {
      toast.error("Invalid avatar file");
      return;
    }

    try {
      let result;

     if (child?.id) {
  // Update existing child
  const payload: UpdateChildPayload = {
    id: child.id,
    name, 
    age: Number(age),
    avatar: avatarFileName!,
    dob: birthDate || undefined,
    
  };
  result = await updateChild(child.id, payload);
} else {
  // Add new child
  const payload: AddChildPayload = {
    name: name!,
    age: Number(age),
    avatar: avatarFileName!,
    dob: birthDate || undefined,
  };
  result = await addChild(payload);
}

      if (result.data) {
        toast.success(
          child?.id ? "Explorer updated! 🚀" : "Explorer added! 🚀",
        );
        navigate("/parent/dashboard");
      } else {
        console.log(result.message);
        toast.error(result.message || "Action failed");
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((e: any) => toast.error(e.msg));
      } else {
        toast.error("Something went wrong");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-6">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
          {child?.id ? "Edit Explorer" : "Add A New Explorer"}
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT SIDE FORM */}
          <div>
            <h2 className="font-semibold mb-4">Select Avatar</h2>
            <div className="grid grid-cols-6 gap-4 mb-8 max-h-40 overflow-y-auto p-2">
              {avatars.map((avatar) => (
                <img
                  key={avatar.id}
                  src={avatar.img}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`w-16 h-16 rounded-xl cursor-pointer border-4 transition duration-200
                  ${
                    selectedAvatar === avatar.id
                      ? "border-blue-500 scale-110 shadow-lg"
                      : "border-transparent hover:scale-105"
                  }`}
                />
              ))}
            </div>

            <label className="block font-semibold mb-2">Explorer Name</label>
            <input
              type="text"
              placeholder="Enter Explorer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-semibold mb-2">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-semibold mb-2">
              Birth Date (optional)
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full border rounded-xl p-3 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleAddChild}
              disabled={!isFormValid}
              className={`w-full py-3 rounded-full font-bold text-white transition
              ${isFormValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
            >
              {child?.id ? "Update Explorer 🚀" : "Activate Explorer 🚀"}
            </button>
          </div>

          {/* RIGHT SIDE PREVIEW */}
          <div className="flex flex-col items-center justify-center bg-blue-50 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-6">Preview</h2>
            {selectedAvatarImage ? (
              <img
                src={selectedAvatarImage}
                className="w-28 h-28 rounded-xl mb-4"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-200 rounded-xl flex items-center justify-center mb-4 text-gray-500">
                Avatar
              </div>
            )}
            <p className="text-xl font-bold">{name || "Explorer Name"}</p>
            <p className="text-gray-600">Age: {age || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChild;
