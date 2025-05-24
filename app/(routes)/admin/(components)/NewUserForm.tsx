"use client";

import React, { useState } from "react";
import { User, NewUser } from "@/types/user";

interface NewUserFormProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setShowAddUserForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewUserForm: React.FC<NewUserFormProps> = ({
  setUsers,
  setShowAddUserForm,
}) => {
  const [newUsers, setNewUsers] = useState<NewUser[]>([
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passwordHash: "",
      avatarUrl: "",
      gender: "MALE",
      age: 18,
      role: "PASSENGER",
    },
  ]);

  const handleUserInputChange = <K extends keyof NewUser>(
    index: number,
    key: K,
    value: NewUser[K],
  ) => {
    const updatedUsers = [...newUsers];
    updatedUsers[index] = {
      ...updatedUsers[index],
      [key]: key === "age" ? Number(value) : value,
    };
    setNewUsers(updatedUsers);
  };

  const addNewUserForm = () => {
    setNewUsers([
      ...newUsers,
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        passwordHash: "",
        avatarUrl: "",
        gender: "MALE",
        age: 18,
        role: "PASSENGER",
      },
    ]);
  };

  const removeUserForm = (index: number) => {
    const updatedUsers = [...newUsers];
    updatedUsers.splice(index, 1);
    setNewUsers(updatedUsers);
  };

  const handleSubmitUsers = async () => {
    for (const user of newUsers) {
      try {
        const response = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create user");
        }

        const createdUser = await response.json();
        setUsers((prev) => [...prev, createdUser]);
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Failed to add one or more users.");
      }
    }

    setNewUsers([
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        passwordHash: "",
        avatarUrl: "",
        gender: "MALE",
        age: 18,
        role: "PASSENGER",
      },
    ]);
    setShowAddUserForm(false);
  };

  return (
    <div className="mb-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Add New Users</h3>
      {newUsers.map((user, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-md bg-white shadow-sm space-y-2"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "Password", name: "passwordHash" },
              { label: "Avatar URL", name: "avatarUrl" },
              { label: "Gender", name: "gender" },
              { label: "Age", name: "age" },
              { label: "Role", name: "role" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  type={
                    name === "age"
                      ? "number"
                      : name === "passwordHash"
                        ? "password"
                        : "text"
                  }
                  value={user[name as keyof typeof user] || ""}
                  onChange={(e) =>
                    handleUserInputChange(
                      index,
                      name as keyof NewUser,
                      name === "age" ? Number(e.target.value) : e.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5"
                />
              </div>
            ))}
          </div>
          {newUsers.length > 1 && (
            <button
              className="text-sm text-red-600 underline"
              onClick={() => removeUserForm(index)}
            >
              Remove This User
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md"
          onClick={addNewUserForm}
        >
          + Add Another User
        </button>

        <button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          onClick={handleSubmitUsers}
        >
          Submit Users
        </button>
      </div>
    </div>
  );
};

export default NewUserForm;
