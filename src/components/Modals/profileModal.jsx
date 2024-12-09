import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfileCard = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
  };
}

  return (
    <div className="col-span-1 max-h-72 bg-white border-solid border-2 border-gray-100 rounded-3xl shadow-md p-4 flex flex-col items-center justify-center">
      {/* Profile Picture Section */}
      <div className="relative">
        {/* Profile Picture */}
        <div className="w-[180px] h-[180px] bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          <img
             src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* Pencil Icon */}
        <label
              htmlFor="avatar-upload"
              className={`absolute bottom-2 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.25 2.25 0 113.181 3.181L9.61 17.1a4.5 4.5 0 01-1.682 1.107l-4.07 1.358 1.358-4.07a4.5 4.5 0 011.107-1.682l10.433-10.433z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6.75l6.75 6.75"
            />
          </svg>
        </label>
        {/* Hidden Input for Image Upload */}
        <input
         type="file"
         id="avatar-upload"
         className="hidden"
         accept="image/*"
         onChange={handleImageUpload}
         disabled={isUpdatingProfile}
        />
      </div>

      {/* Name */}
      <h2 className="mt-4 text-lg font-semibold">{authUser.fullName}</h2>

      {/* Position */}
      <p className="text-gray-500 text-sm">Software Engineer</p>
    </div>
  );
};

export default ProfileCard;
