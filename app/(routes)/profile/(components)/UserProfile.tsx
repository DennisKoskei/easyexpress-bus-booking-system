"use client";

import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { User } from "@/types/user";

type UserProfileProps = {
  reloadFlag: number;
  setReloadFlag: React.Dispatch<React.SetStateAction<number>>;
};

const UserProfile: React.FC<UserProfileProps> = ({ setReloadFlag }) => {
  const userId = "cm9lg7ztx0000xtj0w7gpc3xv";

  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/profile?id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (!formData) return;
    setFormData({
      ...formData,
      [name]: name === "age" ? parseInt(value) : value,
    });
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      const res = await fetch(`/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update user profile");

      const updated = await res.json();
      setUser(updated);
      setFormData(updated);
      setEditable(false);
      setError("");
      // After successful update:
      setReloadFlag((prev) => prev + 1); // You’ll need to pass setReloadFlag as prop or use global state
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save profile.");
    }
  };

  const handleDiscard = () => {
    setFormData(user);
    setEditable(false);
    setError("");
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-8 transition-all ">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <div className="flex gap-3">
          {editable ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={handleDiscard}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition"
              >
                <FaTimes /> Discard
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditable(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="text-center text-gray-600 font-medium animate-pulse">
          Loading profile...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      )}

      {/* Profile Form */}
      {!loading && !error && user && formData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "First Name", key: "firstName" },
            { label: "Last Name", key: "lastName" },
            { label: "Email Address", key: "email" },
            { label: "Phone Number", key: "phone" },
            { label: "Gender", key: "gender" },
            { label: "Age", key: "age" },
            { label: "Role", key: "role", readOnly: true },
            {
              label: "Joined On",
              key: "createdAt",
              readOnly: true,
              value: new Date(formData.createdAt).toLocaleDateString(),
            },
          ].map(({ label, key, readOnly, value }) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                {label}
              </label>

              {editable && !readOnly ? (
                key === "gender" ? (
                  <select
                    name={key}
                    value={formData[key as keyof User]}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                ) : (
                  <input
                    type={key === "age" ? "number" : "text"}
                    name={key}
                    value={formData[key as keyof User] as string | number}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )
              ) : (
                <div className="bg-gray-50 text-gray-800 p-2 rounded-lg border border-gray-200">
                  {value || formData[key as keyof User]}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
