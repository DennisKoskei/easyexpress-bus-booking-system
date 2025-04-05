"use client";

import React, { useEffect, useState } from "react";
import NewBusForm from "./NewBusForm";
import { FaEdit, FaTrash, FaSave, FaPlus, FaSyncAlt } from "react-icons/fa";
import { Bus } from "@/types/bus";

type EditableBusKeys = keyof Omit<Bus, "id">;

const BusContent: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBusId, setEditingBusId] = useState<string | null>(null);
  const [editedBus, setEditedBus] = useState<Partial<Bus> | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/buses");
      if (!response.ok) throw new Error("Failed to fetch buses");
      const data: Bus[] = await response.json();
      setBuses(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleEdit = (bus: Bus) => {
    setEditingBusId(bus.id);
    setEditedBus({ ...bus });
  };

  const handleSave = async () => {
    if (editingBusId && editedBus) {
      try {
        const response = await fetch("/api/admin/buses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingBusId, ...editedBus }),
        });

        if (!response.ok) throw new Error("Failed to update bus");

        const updatedBus = await response.json();

        setBuses(
          buses.map((bus) =>
            bus.id === editingBusId ? { ...bus, ...updatedBus } : bus,
          ),
        );
        setEditingBusId(null);
        setEditedBus(null);
      } catch (error) {
        console.error("Error updating bus:", error);
        alert("Failed to update bus. Please try again.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this bus?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/admin/buses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete bus");

      setBuses(buses.filter((bus) => bus.id !== id));
    } catch (error) {
      console.error("Error deleting bus:", error);
      alert("Failed to delete bus. Please try again.");
    }
  };

  if (loading) return <p>Loading buses...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Buses</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchBuses}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center gap-2 disabled:opacity-50"
            title="Refresh Buses"
            disabled={loading}
          >
            <FaSyncAlt
              className={`text-gray-700 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>

          <span className="text-sm text-gray-600">
            Showing | {buses.length} of {buses.length}
          </span>

          <button
            className={`px-3 py-2 flex items-center gap-2 text-sm ${showAddForm
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-lg`}
            onClick={() => setShowAddForm((prev) => !prev)}
          >
            {showAddForm ? (
              <>
                <span>✖</span>
                <span>Cancel</span>
              </>
            ) : (
              <>
                <FaPlus />
                <span>Add Bus</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add Bus Form Placeholder */}
      {showAddForm && (
        <div className="p-4 border border-gray-300 mb-4 rounded-md bg-gray-50">
          {/* You can extract this into a <NewBusForm /> like the users form later */}
          <NewBusForm
            setBuses={setBuses}
            setShowAddBusForm={setShowAddForm}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Plate Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Total Seats
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Driver ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Bus Avatar
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {buses.map((bus, index) => (
              <tr key={bus.id} className="border-b border-gray-300">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                {(
                  [
                    "plateNumber",
                    "totalSeats",
                    "driverId",
                    "busAvatar",
                  ] as EditableBusKeys[]
                ).map((key) => (
                  <td key={key} className="border border-gray-300 px-4 py-2">
                    {editingBusId === bus.id ? (
                      <input
                        type={key === "totalSeats" ? "number" : "text"}
                        defaultValue={bus[key]?.toString() || ""}
                        onChange={(e) =>
                          setEditedBus({
                            ...editedBus,
                            [key]:
                              key === "totalSeats"
                                ? parseInt(e.target.value)
                                : e.target.value,
                          })
                        }
                        className="w-full border rounded-md bg-white"
                      />
                    ) : (
                      bus[key]?.toString() || "-"
                    )}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                  {editingBusId === bus.id ? (
                    <button className="text-green-500" onClick={handleSave}>
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      className="text-blue-500"
                      onClick={() => handleEdit(bus)}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(bus.id)}
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

export default BusContent;
