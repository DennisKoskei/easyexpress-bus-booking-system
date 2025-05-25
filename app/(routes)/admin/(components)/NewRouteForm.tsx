"use client";

import React, { useEffect, useState } from "react";
import { Route } from "@/types/route";
import { Bus } from "@/types/bus";

interface NewRouteFormProps {
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
  setShowAddRouteForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type NewRoute = Omit<Route, "id">;

const NewRouteForm: React.FC<NewRouteFormProps> = ({
  setRoutes,
  setShowAddRouteForm,
}) => {
  const [newRoutes, setNewRoutes] = useState<NewRoute[]>([
    {
      departure: "",
      destination: "",
      date: new Date(),
      time: "",
      amount: 0,
      busId: "",
    },
  ]);

  const [errors, setErrors] = useState<
    Record<number, Partial<Record<keyof NewRoute, boolean>>>
  >({});
  const [buses, setBuses] = useState<Bus[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("/api/admin/buses");
        if (!res.ok) throw new Error("Failed to fetch buses");
        const data = await res.json();
        setBuses(data);
      } catch (err) {
        console.error("Error loading buses:", err);
      }
    };

    fetchBuses();
  }, []);

  const validateRoute = (
    route: NewRoute,
  ): Partial<Record<keyof NewRoute, boolean>> => {
    const routeErrors: Partial<Record<keyof NewRoute, boolean>> = {};
    if (!route.departure.trim()) routeErrors.departure = true;
    if (!route.destination.trim()) routeErrors.destination = true;
    if (!route.date) routeErrors.date = true;
    if (!route.time.trim()) routeErrors.time = true;
    if (!route.amount || route.amount <= 0) routeErrors.amount = true;
    if (!route.busId.trim()) routeErrors.busId = true;
    return routeErrors;
  };

  const handleRouteInputChange = <K extends keyof NewRoute>(
    index: number,
    key: K,
    value: NewRoute[K],
  ) => {
    const updatedRoutes = [...newRoutes];
    updatedRoutes[index] = {
      ...updatedRoutes[index],
      [key]:
        key === "amount"
          ? Number(value)
          : key === "date"
            ? new Date(value as string)
            : value,
    };
    setNewRoutes(updatedRoutes);
  };

  const addNewRouteForm = () => {
    setNewRoutes([
      ...newRoutes,
      {
        departure: "",
        destination: "",
        date: new Date(),
        time: "",
        amount: 0,
        busId: "",
      },
    ]);
  };

  const removeRouteForm = (index: number) => {
    const updatedRoutes = [...newRoutes];
    updatedRoutes.splice(index, 1);
    setNewRoutes(updatedRoutes);
  };

  const handleSubmitRoutes = async () => {
    let hasError = false;
    const newErrors: typeof errors = {};

    newRoutes.forEach((route, i) => {
      const routeErrors = validateRoute(route);
      if (Object.keys(routeErrors).length > 0) {
        hasError = true;
        newErrors[i] = routeErrors;
      }
    });

    setErrors(newErrors);
    if (hasError) return;

    for (const route of newRoutes) {
      try {
        const response = await fetch("/api/admin/routes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(route),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create route");
        }

        const createdRoute = await response.json();
        setRoutes((prev) => [...prev, createdRoute]);
      } catch (error) {
        console.error("Error adding route:", error);
        alert("Failed to add one or more routes.");
      }
    }

    setNewRoutes([
      {
        departure: "",
        destination: "",
        date: new Date(),
        time: "",
        amount: 0,
        busId: "",
      },
    ]);
    setShowAddRouteForm(false);
    setShowToast(true); // Show the success toast after submission
  };

  return (
    <div className="mb-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Add New Routes</h3>

      {/* Success Toast */}
      {showToast && (
        <div className="absolute top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
          <p>Route successfully added!</p>
        </div>
      )}

      {newRoutes.map((route, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-md bg-white shadow-sm space-y-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Departure */}
            <div>
              <label className="block text-sm font-medium">Departure</label>
              <input
                type="text"
                value={route.departure}
                onChange={(e) =>
                  handleRouteInputChange(index, "departure", e.target.value)
                }
                className={`w-full border rounded-md px-3 py-1.5 ${errors[index]?.departure
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium">Destination</label>
              <input
                type="text"
                value={route.destination}
                onChange={(e) =>
                  handleRouteInputChange(index, "destination", e.target.value)
                }
                className={`w-full border rounded-md px-3 py-1.5 ${errors[index]?.destination
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                value={new Date(route.date).toISOString().split("T")[0]}
                onChange={(e) =>
                  handleRouteInputChange(index, "date", e.target.value)
                }
                className={`w-full border rounded-md px-3 py-1.5 ${errors[index]?.date ? "border-red-500" : "border-gray-300"
                  }`}
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium">Time</label>
              <input
                type="time"
                value={route.time}
                onChange={(e) =>
                  handleRouteInputChange(index, "time", e.target.value)
                }
                className={`w-full border rounded-md px-3 py-1.5 ${errors[index]?.time ? "border-red-500" : "border-gray-300"
                  }`}
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium">Amount (KES)</label>
              <input
                type="number"
                value={route.amount}
                onChange={(e) =>
                  handleRouteInputChange(
                    index,
                    "amount",
                    Number(e.target.value),
                  )
                }
                className={`w-full border rounded-md px-3 py-1.5 ${errors[index]?.amount ? "border-red-500" : "border-gray-300"
                  }`}
              />
            </div>

            {/* Bus ID (dropdown showing plateNumber) */}
            <div>
              <label className="block text-sm font-medium">Bus</label>
              <select
                value={route.busId}
                onChange={(e) =>
                  handleRouteInputChange(index, "busId", e.target.value)
                }
                className={`w-full border rounded-md px-3 py-1.5 ${errors[index]?.busId ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="">Select a bus</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    {bus.plateNumber || `Bus ${bus.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {newRoutes.length > 1 && (
            <button
              className="text-sm text-red-600 underline mt-2"
              onClick={() => removeRouteForm(index)}
            >
              Remove This Route
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md"
          onClick={addNewRouteForm}
        >
          + Add Another Route
        </button>

        <button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          onClick={handleSubmitRoutes}
        >
          Submit Routes
        </button>
      </div>
    </div>
  );
};

export default NewRouteForm;
