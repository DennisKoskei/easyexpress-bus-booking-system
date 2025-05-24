"use client";

import React, { useState } from "react";
import { Driver, NewDriver } from "@/types/driver";

interface NewDriverFormProps {
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  setShowAddDriverForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewDriverForm: React.FC<NewDriverFormProps> = ({
  setDrivers: setDrivers,
  setShowAddDriverForm: setShowAddDriverForm,
}) => {
  const [newDrivers, setNewDrivers] = useState<NewDriver[]>([
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passwordHash: "",
      avatarUrl: "",
      licenseNo: "",
      experience: 0,
      gender: "MALE",
      age: 18,
    },
  ]);

  const handleDriverInputChange = <K extends keyof NewDriver>(
    index: number,
    key: K,
    value: NewDriver[K],
  ) => {
    const updatedDrivers = [...newDrivers];
    updatedDrivers[index] = {
      ...updatedDrivers[index],
      [key]: key === "age" ? Number(value) : value,
    };
    setNewDrivers(updatedDrivers);
  };

  const addNewDriverForm = () => {
    setNewDrivers([
      ...newDrivers,
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        passwordHash: "",
        avatarUrl: "",
        licenseNo: "",
        experience: 0,
        gender: "MALE",
        age: 18,
      },
    ]);
  };

  const removeDriverForm = (index: number) => {
    const updatedDrivers = [...newDrivers];
    updatedDrivers.splice(index, 1);
    setNewDrivers(updatedDrivers);
  };

  const handleSubmitDrivers = async () => {
    for (const driver of newDrivers) {
      try {
        const response = await fetch("/api/admin/drivers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(driver),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create drivers");
        }

        const createdDriver = await response.json();
        setDrivers((prev) => [...prev, createdDriver]);
      } catch (error) {
        console.error("Error adding driver:", error);
        alert("Failed to add one or more drivers.");
      }
    }

    setNewDrivers([
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        passwordHash: "",
        avatarUrl: "",
        licenseNo: "",
        experience: 0,
        gender: "MALE",
        age: 18,
      },
    ]);
    setShowAddDriverForm(false);
  };

  return (
    <div className="mb-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Add New Drivers</h3>
      {newDrivers.map((driver, index) => (
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
              { label: "License No", name: "licenseNo" },
              { label: "Experience", name: "experience" },
              { label: "Gender", name: "gender" },
              { label: "Age", name: "age" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  type={
                    name === "age" || name === "experience"
                      ? "number"
                      : name === "passwordHash"
                        ? "password"
                        : "text"
                  }
                  value={driver[name as keyof typeof driver] ?? ""}
                  onChange={(e) =>
                    handleDriverInputChange(
                      index,
                      name as keyof NewDriver,
                      name === "age" || name === "experience"
                        ? Number(e.target.value)
                        : e.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-1.5"
                />
              </div>
            ))}
          </div>
          {newDrivers.length > 1 && (
            <button
              className="text-sm text-red-600 underline"
              onClick={() => removeDriverForm(index)}
            >
              Remove This Driver
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md"
          onClick={addNewDriverForm}
        >
          + Add Another Driver
        </button>

        <button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          onClick={handleSubmitDrivers}
        >
          Submit Drivers
        </button>
      </div>
    </div>
  );
};

export default NewDriverForm;
