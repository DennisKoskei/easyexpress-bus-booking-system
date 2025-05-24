"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NewUserForm from "./NewUserForm";
import { FaEdit, FaTrash, FaSave, FaPlus, FaSyncAlt } from "react-icons/fa";
import { User } from "@/types/user";

// Generates a pastel color based on input string
const getColorFromString = (str: string): string => {
  const colors = [
    "#F59E0B", // amber-500
    "#10B981", // emerald-500
    "#3B82F6", // blue-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
    "#EF4444", // red-500
    "#14B8A6", // teal-500
    "#EAB308", // yellow-500
    "#6366F1", // indigo-500
  ];
  const index = str.charCodeAt(0) % colors.length;
  return colors[index];
};

const UsersContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User> | null>(null);
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    if (!editingUserId || !editedUser) return;

    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingUserId, ...editedUser }),
      });

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = await response.json();

      setUsers(
        users.map((user) =>
          user.id === editingUserId ? { ...user, ...updatedUser } : user,
        ),
      );
      setEditingUserId(null);
      setEditedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleFieldChange = (key: keyof User, value: string) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [key]: value });
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchUsers}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center gap-2 disabled:opacity-50"
            disabled={loading}
          >
            <FaSyncAlt
              className={`text-gray-700 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <span className="text-sm text-gray-600">
            Showing | {users.length} of {users.length}
          </span>
          <button
            className={`px-3 py-2 flex items-center gap-2 text-sm ${showAddUserForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg`}
            onClick={() => setShowAddUserForm((prev) => !prev)}
          >
            {showAddUserForm ? (
              <>
                <span>✖</span>
                <span>Cancel</span>
              </>
            ) : (
              <>
                <FaPlus />
                <span>Add User</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showAddUserForm && (
        <NewUserForm
          setUsers={setUsers}
          setShowAddUserForm={setShowAddUserForm}
        />
      )}

      <div className="overflow-x-auto bg-white">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Avatar</th>
              <th className="px-4 py-2 border">Bookings</th>
              <th className="px-4 py-2 border">Tickets</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{idx + 1}</td>
                {[
                  "firstName",
                  "lastName",
                  "email",
                  "phone",
                  "gender",
                  "age",
                  "role",
                ].map((key) => (
                  <td key={key} className="px-4 py-2 border">
                    {editingUserId === user.id ? (
                      <input
                        className="border rounded px-2 py-1 text-sm w-full"
                        value={editedUser?.[key as keyof User] ?? ""}
                        onChange={(e) =>
                          handleFieldChange(key as keyof User, e.target.value)
                        }
                      />
                    ) : (
                      user[key as keyof User]
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 border">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt="Avatar"
                      width={100}
                      height={100}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                      style={{
                        backgroundColor: getColorFromString(
                          user.firstName || "U",
                        ),
                      }}
                    >
                      {user.firstName?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 border">{user.totalBookings}</td>
                <td className="px-4 py-2 border">{user.totalTickets}</td>
                <td className="px-4 py-2 border">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  {editingUserId === user.id ? (
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersContent;
