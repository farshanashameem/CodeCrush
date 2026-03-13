import { useNavigate } from "react-router-dom"

import av1 from "../../../../assets/avatar/av1.jpg"
import av2 from "../../../../assets/avatar/av2.jpg"

const ParentDashboard = () => {

  const navigate = useNavigate()

  const children: any[] = []

  const dummyChildren = [
    {
      name: "Leo",
      age: 10,
      avatar: av1
    },
    {
      name: "Maya",
      age: 8,
      avatar: av2
    }
  ]

  const displayChildren = children.length ? children : dummyChildren

  return (
    <div className="flex justify-center px-6 mt-10">

      <div className="w-full max-w-5xl">

        <div className="bg-white/80 backdrop-blur-lg rounded-[30px] shadow-2xl p-10">

          {/* Header */}
          <div className="text-center mb-12">

            <h1 className="text-3xl font-bold text-blue-700">
              Parent Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Manage your explorers and track their learning
            </p>

          </div>

          {/* No Child Message */}
          {children.length === 0 && (

            <div className="text-center mb-10">

              <p className="text-gray-500 mb-6">
                No children added yet
              </p>

              <button
                onClick={() => navigate("/parent/add-explorer")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold"
              >
                Add Your First Child +
              </button>

            </div>

          )}

          {/* Avatar Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">

            {displayChildren.map((child, index) => (

              <div
                key={index}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition"
              >

                <img
                  src={child.avatar}
                  className="w-28 h-28 rounded-2xl shadow-lg mb-3"
                />

                <p className="font-bold text-blue-700">
                  {child.name}
                </p>

                <p className="text-gray-500 text-sm">
                  Age {child.age}
                </p>

              </div>

            ))}

            {/* Add Child Card */}
            <div
              onClick={() => navigate("/parent/add-child")}
              className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-blue-400 rounded-2xl cursor-pointer hover:bg-blue-50 transition"
            >

              <span className="text-3xl text-blue-500">+</span>

              <p className="text-sm text-blue-600 font-semibold">
                Add Child
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ParentDashboard