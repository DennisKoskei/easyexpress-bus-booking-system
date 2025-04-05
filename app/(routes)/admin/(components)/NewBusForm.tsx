"use client";

import React, { useEffect, useState } from "react";
import { Bus, NewBus } from "@/types/bus";
import { Driver } from "@/types/driver";

interface NewBusFormProps {
  setBuses: React.Dispatch<React.SetStateAction<Bus[]>>;
  setShowAddBusForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewBusForm: React.FC<NewBusFormProps> = ({
  setBuses,
  setShowAddBusForm,
}) => {
  const [newBuses, setNewBuses] = useState<NewBus[]>([
    { plateNumber: "", capacity: 45, model: "", driverId: "" },
  ]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("/api/admin/drivers");
        if (!res.ok) throw new Error("Failed to fetch drivers");
        const data = await res.json();
        setDrivers(data);
      } catch (err) {
        console.error("Failed to fetch drivers", err);
      }
    };
    fetchDrivers();
  }, []);

  const handleChange = <K extends keyof NewBus>(
    index: number,
    key: K,
    value: NewBus[K],
  ) => {
    const updated = [...newBuses];
    updated[index][key] = value;
    setNewBuses(updated);
  };

  const handleAddBus = () => {
    setNewBuses([
      ...newBuses,
      { plateNumber: "", capacity: 45, model: "", driverId: "" },
    ]);
  };

  const handleRemoveBus = (index: number) => {
    const updatedBuses = [...newBuses];
    updatedBuses.splice(index, 1);
    setNewBuses(updatedBuses);
  };

  const handleSubmitBuses = async () => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        newBuses.map((bus) =>
          fetch("/api/admin/buses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bus),
          }),
        ),
      );

      const allSuccessful = responses.every((res) => res.ok);
      if (!allSuccessful) throw new Error("One or more buses failed to submit");

      const createdBuses = await Promise.all(
        responses.map((res) => res.json()),
      );
      setBuses((prev) => [...prev, ...createdBuses]);

      // Reset state
      setNewBuses([{ plateNumber: "", capacity: 45, model: "", driverId: "" }]);
      setShowAddBusForm(false);
    } catch (err) {
      console.error("Error adding buses:", err);
      alert("Failed to submit buses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Add New Buses</h3>

      {newBuses.map((bus, index) => (
        <div
          key={index}
          className="p-4 bg-white border rounded-lg shadow-sm space-y-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Plate Number
              </label>
              <input
                type="text"
                value={bus.plateNumber}
                onChange={(e) =>
                  handleChange(index, "plateNumber", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-1.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Capacity</label>
              <input
                type="number"
                value={bus.capacity}
                onChange={(e) =>
                  handleChange(index, "capacity", Number(e.target.value))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-1.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Model</label>
              <input
                type="text"
                value={bus.model}
                onChange={(e) => handleChange(index, "model", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Driver</label>
              <select
                value={bus.driverId}
                onChange={(e) =>
                  handleChange(index, "driverId", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-1.5"
              >
                <option value="">-- Select Driver --</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.firstName} {driver.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {newBuses.length > 1 && (
            <button
              type="button"
              className="text-red-600 text-sm underline"
              onClick={() => handleRemoveBus(index)}
            >
              Remove This Bus
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          type="button"
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
          onClick={handleAddBus}
        >
          + Add Another Bus
        </button>

        <button
          type="button"
          className={`px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md ${loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          onClick={handleSubmitBuses}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Buses"}
        </button>
      </div>
    </div>
  );
};

export default NewBusForm;
