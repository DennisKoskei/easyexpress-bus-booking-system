"use client";

import React, { useEffect, useState } from "react";
import NewRouteForm from "./NewRouteForm";
import { FaEdit, FaTrash, FaSave, FaPlus, FaSyncAlt } from "react-icons/fa";
import { Route } from "@/types/route";

const RoutesContent: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);
  const [editedRoute, setEditedRoute] = useState<Partial<Route> | null>(null);
  const [showAddRouteForm, setShowAddRouteForm] = useState<boolean>(false);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/routes");
      if (!response.ok) throw new Error("Failed to fetch routes");
      const data: Route[] = await response.json();
      setRoutes(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleEdit = (route: Route) => {
    setEditingRouteId(route.id);
    setEditedRoute({ ...route });
  };

  const handleSave = async () => {
    if (!editingRouteId || !editedRoute) return;

    try {
      const response = await fetch("/api/admin/routes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingRouteId, ...editedRoute }),
      });

      if (!response.ok) throw new Error("Failed to update routes");

      const updatedRoute = await response.json();

      setRoutes(
        routes.map((route) =>
          route.id === editingRouteId ? { ...route, ...updatedRoute } : route,
        ),
      );
      setEditingRouteId(null);
      setEditedRoute(null);
    } catch (error) {
      console.error("Error updating route:", error);
      alert("Failed to update route. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this route?",
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/admin/routes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete route");

      setRoutes(routes.filter((route) => route.id !== id));
    } catch (error) {
      console.error("Error deleting route:", error);
      alert("Failed to delete route. Please try again.");
    }
  };

  if (loading) return <p>Loading routes...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Routes</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchRoutes}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center gap-2 disabled:opacity-50"
            disabled={loading}
          >
            <FaSyncAlt
              className={`text-gray-700 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <span className="text-sm text-gray-600">
            Showing | {routes.length} of {routes.length}
          </span>
          <button
            className={`px-3 py-2 flex items-center gap-2 text-sm ${showAddRouteForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg`}
            onClick={() => setShowAddRouteForm((prev) => !prev)}
          >
            {showAddRouteForm ? (
              <>
                <span>✖</span>
                <span>Cancel</span>
              </>
            ) : (
              <>
                <FaPlus />
                <span>Add Route</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showAddRouteForm && (
        <NewRouteForm
          setRoutes={setRoutes}
          setShowAddRouteForm={setShowAddRouteForm}
        />
      )}

      <div className="overflow-x-auto bg-white">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Departure
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Destination
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Amount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Bus ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route, index) => (
              <tr key={route.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                {(
                  [
                    "departure",
                    "destination",
                    "date",
                    "time",
                    "amount",
                    "busId",
                  ] as const
                ).map((key: keyof Route) => (
                  <td
                    key={key}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {editingRouteId === route.id ? (
                      <input
                        type={
                          key === "amount"
                            ? "number"
                            : key === "date"
                              ? "date"
                              : "text"
                        }
                        defaultValue={
                          key === "date"
                            ? new Date(route.date).toISOString().split("T")[0]
                            : String(route[key] ?? "")
                        }
                        onChange={(e) =>
                          setEditedRoute({
                            ...editedRoute,
                            [key]:
                              key === "amount"
                                ? parseFloat(e.target.value)
                                : key === "date"
                                  ? new Date(e.target.value)
                                  : e.target.value,
                          })
                        }
                        className="w-full rounded-md bg-white"
                      />
                    ) : key === "date" ? (
                      new Date(route.date).toLocaleDateString()
                    ) : (
                      String(route[key] ?? "")
                    )}
                  </td>
                ))}

                <td className="px-4 py-2 border">
                  {editingRouteId === route.id ? (
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(route)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(route.id)}
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

export default RoutesContent;
