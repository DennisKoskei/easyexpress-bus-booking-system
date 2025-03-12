"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Pencil, Save, Upload } from "lucide-react";
import { getSession } from "next-auth/react"; // Client-side session retrieval

const EditProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    profilePhoto: "",
  });

  const [editField, setEditField] = useState<string | null>(null);
  const [newValue, setNewValue] = useState("");

  // Unified function for session check and user data fetch
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      console.log("Session in EditProfile:", session);

      if (!session) return;

      try {
        console.log("Fetching user data...");
        const res = await fetch("/api/profile/user-profile");
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (field: string, value: string) => {
    setEditField(field);
    setNewValue(value);
  };

  const handleSave = async (field: string) => {
    try {
      const res = await fetch("/api/profile/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: newValue }),
      });

      if (res.ok) {
        setUser((prev) => ({ ...prev, [field]: newValue }));
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setEditField(null);
  };

  const handleProfilePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/profile/upload-profile-photo", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser((prev) => ({
          ...prev,
          profilePhoto: updatedUser.profilePhoto,
        }));
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  return (
    <section className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Edit Profile</h2>

      {/* Profile Photo Upload */}
      <div className="flex flex-col items-center mb-4">
        <Image
          src={user.profilePhoto || "/Assets/profile-pic.png"}
          width={48}
          height={48}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <label className="mt-2 cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md">
          <Upload size={16} />
          Change Photo
          <input
            type="file"
            className="hidden"
            onChange={handleProfilePhotoUpload}
          />
        </label>
      </div>

      {/* User Info Fields */}
      {Object.keys(user).map(
        (field) =>
          field !== "profilePhoto" && (
            <div
              key={field}
              className="flex justify-between items-center py-2 border-b"
            >
              <span className="font-medium capitalize">{field}:</span>
              {editField === field ? (
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{user[field as keyof typeof user] || "N/A"}</span>
              )}
              <button
                className="ml-2 text-blue-500 hover:text-blue-700"
                onClick={() =>
                  editField === field
                    ? handleSave(field)
                    : handleEdit(field, user[field as keyof typeof user] || "")
                }
              >
                {editField === field ? (
                  <Save size={18} />
                ) : (
                  <Pencil size={18} />
                )}
              </button>
            </div>
          ),
      )}
    </section>
  );
};

export default EditProfile;
