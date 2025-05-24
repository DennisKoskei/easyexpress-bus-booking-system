"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NewDriverForm from "./NewDriverForm";
import { FaEdit, FaTrash, FaSave, FaPlus, FaSyncAlt } from "react-icons/fa";
import { Driver } from "@/types/driver";

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

const DriversContent: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDriverId, setEditingDriverId] = useState<string | null>(null);
  const [editedDriver, setEditedDriver] = useState<Partial<Driver> | null>(
    null,
  );
  const [showAddDriverForm, setShowAddDriverForm] = useState<boolean>(false);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/drivers");
      if (!response.ok) throw new Error("Failed to fetch drivers");
      const data: Driver[] = await response.json();
      setDrivers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleEdit = (driver: Driver) => {
    setEditingDriverId(driver.id);
    setEditedDriver({ ...driver });
  };

  const handleSave = async () => {
    if (!editingDriverId || !editedDriver) return;

    try {
      const response = await fetch("/api/admin/drivers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingDriverId, ...editedDriver }),
      });

      if (!response.ok) throw new Error("Failed to update driver");

      const updatedDriver = await response.json();

      setDrivers(
        drivers.map((driver) =>
          driver.id === editingDriverId
            ? { ...driver, ...updatedDriver }
            : driver,
        ),
      );
      setEditingDriverId(null);
      setEditedDriver(null);
    } catch (error) {
      console.error("Error updating driver:", error);
      alert("Failed to update driver. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this driver?",
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/admin/drivers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Show specific error message returned by backend
        if (result?.error) {
          alert(result.error); // 🟡 This will now show: "Cannot delete driver. They are currently assigned to a bus."
        } else {
          alert("Failed to delete driver. Please try again.");
        }
        return;
      }

      setDrivers(drivers.filter((driver) => driver.id !== id));
    } catch (error) {
      console.error("Error deleting driver:", error);
      alert("Failed to delete driver. Please try again.");
    }
  };

  const handleFieldChange = (key: keyof Driver, value: string) => {
    if (!editedDriver) return;

    let parsedValue: string | number = value;

    if (key === "age" || key === "experience") {
      parsedValue = Number(value);
    }

    setEditedDriver({ ...editedDriver, [key]: parsedValue });
  };

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Drivers</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchDrivers}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center gap-2 disabled:opacity-50"
            disabled={loading}
          >
            <FaSyncAlt
              className={`text-gray-700 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <span className="text-sm text-gray-600">
            Showing | {drivers.length} of {drivers.length}
          </span>
          <button
            className={`px-3 py-2 flex items-center gap-2 text-sm ${showAddDriverForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg`}
            onClick={() => setShowAddDriverForm((prev) => !prev)}
          >
            {showAddDriverForm ? (
              <>
                <span>✖</span>
                <span>Cancel</span>
              </>
            ) : (
              <>
                <FaPlus />
                <span>Add Drivers</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showAddDriverForm && (
        <NewDriverForm
          setDrivers={setDrivers}
          setShowAddDriverForm={setShowAddDriverForm}
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
              <th className="px-4 py-2 border">License No</th>
              <th className="px-4 py-2 border">Experience</th>
              <th className="px-4 py-2 border">Avatar</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, idx) => (
              <tr key={driver.id}>
                <td className="px-4 py-2 border">{idx + 1}</td>
                {[
                  "firstName",
                  "lastName",
                  "email",
                  "phone",
                  "gender",
                  "age",
                  "licenseNo",
                  "experience",
                ].map((key) => (
                  <td key={key} className="px-4 py-2 border">
                    {editingDriverId === driver.id ? (
                      <input
                        className="border rounded px-2 py-1 text-sm w-full"
                        value={editedDriver?.[key as keyof Driver] ?? ""}
                        onChange={(e) =>
                          handleFieldChange(key as keyof Driver, e.target.value)
                        }
                      />
                    ) : (
                      driver[key as keyof Driver]
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 border">
                  {driver.avatarUrl ? (
                    <Image
                      src={driver.avatarUrl}
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
                          driver.firstName || "U",
                        ),
                      }}
                    >
                      {driver.firstName?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(driver.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  {editingDriverId === driver.id ? (
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(driver)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(driver.id)}
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

export default DriversContent;
