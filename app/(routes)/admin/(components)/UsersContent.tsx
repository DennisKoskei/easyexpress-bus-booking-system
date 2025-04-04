"use client";

import React, { useEffect, useState } from "react";
import NewUserForm from "./NewUserForm";
import { FaEdit, FaTrash, FaSave, FaPlus } from "react-icons/fa";
import { User, EditableUserKeys } from "@/types/user";

const UsersContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User> | null>(null);
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    if (editingUserId && editedUser) {
      try {
        const response = await fetch("/api/admin/users", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: editingUserId, ...editedUser }),
        });

        if (!response.ok) {
          throw new Error("Failed to update user");
        }

        const updatedUser = await response.json();

        // Update the local users list with the updated user
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
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the user from local state after successful deletion
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <button
          className={`px-4 py-2 flex items-center gap-2 ${showAddUserForm
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-lg`}
          onClick={() => setShowAddUserForm((prev) => !prev)}
        >
          {showAddUserForm ? (
            <>
              <span>✖ </span>
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

      {showAddUserForm && (
        <NewUserForm
          setUsers={setUsers}
          setShowAddUserForm={setShowAddUserForm}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                First Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Last Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Phone
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Gender
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Age
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {index + 1}
                </td>
                {Object.keys(user)
                  .filter(
                    (key) =>
                      key !== "id" &&
                      key !== "passwordHash" &&
                      key !== "createdAt",
                  )
                  .map((key) => {
                    const typedKey = key as EditableUserKeys;
                    return (
                      <td
                        key={key}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        {editingUserId === user.id ? (
                          <input
                            type={typedKey === "age" ? "number" : "text"}
                            defaultValue={user[typedKey] as string | number}
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                [typedKey]:
                                  typedKey === "age"
                                    ? parseInt(e.target.value)
                                    : e.target.value,
                              })
                            }
                            className="w-full border-red-800 rounded-md bg-white"
                          />
                        ) : (
                          user[typedKey]
                        )}
                      </td>
                    );
                  })}
                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                  {editingUserId === user.id ? (
                    <button className="text-green-500" onClick={handleSave}>
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      className="text-blue-500"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(user.id)}
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
