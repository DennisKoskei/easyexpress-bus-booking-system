"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaBus, FaCheckCircle } from "react-icons/fa";
import { formatDate, formatTime } from "@utils/dateUtils";
import { formatAmount } from "@utils/amountUtil";
import { Bus } from "@/types/bus";
import { Seat } from "@/types/seat";
import { Route } from "@/types/route";
import { PassengerDetail } from "@/types/passengerDetails";

const BookingPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const busId = searchParams.get("busId");
  const routeId = searchParams.get("routeId");

  const [route, setRoute] = useState<Route | null>(null);
  const [bus, setBus] = useState<Bus | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetail[]>(
    [],
  );

  useEffect(() => {
    if (!busId || !routeId) {
      return router.push("/"); // Redirect if search params are missing
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `/api/user/initiate-bookings?busId=${busId}&routeId=${routeId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRoute(data.route);
        setBus(data.bus);
        setSeats(data.seats);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingDetails();
  }, [busId, routeId]);

  const toggleSeatSelection = (seatNumber: number): void => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber],
    );

    setPassengerDetails((prevDetails) =>
      prevDetails.some((detail) => detail.seat === seatNumber)
        ? prevDetails.filter((detail) => detail.seat !== seatNumber)
        : [
            ...prevDetails,
            { seat: seatNumber, name: "", phone: "", idNumber: "" },
          ],
    );
  };

  const handleInputChange = (
    seatNumber: number,
    field: "name" | "phone" | "idNumber",
    value: string,
  ) => {
    setPassengerDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.seat === seatNumber ? { ...detail, [field]: value } : detail,
      ),
    );
  };

  if (!route || !bus) return <div>Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!routeId || !busId) return;

    try {
      const response = await fetch("/api/user/booking-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routeId,
          busId,
          passengerDetails,
          selectedSeats,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      alert("Booking successful!");
      router.push("/payment"); // or confirmation page
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 p-6">
      <header className="bg-blue-900 text-white p-4 text-center text-2xl font-semibold rounded-md">
        EasyExpress - Bus Ticket Booking
      </header>

      <div className="container mx-auto md:flex-col flex-row my-10 gap-6">
        {/* Seat Selection Section */}
        <div className="w-full md:w-1/3 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-center mb-4">
            Select Your Seat
          </h2>
          <div className="grid grid-cols-4 gap-3 p-4 bg-gray-200 rounded-lg">
            {seats.map((seat) => (
              <button
                key={seat.seatNumber}
                className={`w-12 h-12 flex items-center justify-center border rounded-md font-semibold transition-all ${
                  seat.isBooked
                    ? "bg-red-500 text-white cursor-not-allowed"
                    : selectedSeats.includes(seat.seatNumber)
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => toggleSeatSelection(seat.seatNumber)}
                disabled={seat.isBooked} // Disable booked seats
              >
                {selectedSeats.includes(seat.seatNumber) ? (
                  <FaCheckCircle />
                ) : (
                  seat.seatNumber
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="w-full md:w-2/3 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-wrap justify-between mb-4">
            <div className="w-1/3 p-4 bg-gray-200 rounded-lg">
              <FaBus className="text-blue-700 text-3xl mx-auto" />
              <p className="text-center mt-2 font-bold">
                {route.departure} → {route.destination}
              </p>
            </div>
            <div className="w-2/3 p-4 bg-gray-200 rounded-lg">
              <p className="text-lg font-semibold">
                Date:{" "}
                <span className="font-normal">{formatDate(route.date)}</span>
              </p>
              <p className="text-lg font-semibold">
                Departure:{" "}
                <span className="font-normal">{formatTime(route.time)}</span>
              </p>
              <p className="text-lg font-semibold">
                Price per Seat:{" "}
                <span className="font-normal">
                  {formatAmount(route.amount)} /=
                </span>
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="p-4 bg-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Booking Submission</h2>
            <form className="px-2" onSubmit={handleSubmit}>
              {selectedSeats.length > 0 && (
                <>
                  {passengerDetails.map(({ seat, name, phone, idNumber }) => (
                    <div
                      key={seat}
                      className="flex flex-row gap-4 mb-2 bg-white p-2 rounded-lg border"
                    >
                      <p className="text-lg w-1/12 font-semibold text-center">
                        Seat {seat}
                      </p>
                      <div className="flex flex-row w-5/6 gap-4">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) =>
                            handleInputChange(seat, "name", e.target.value)
                          }
                          placeholder="Passenger Name"
                          className="p-2 border rounded-md w-1/3"
                          required
                        />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) =>
                            handleInputChange(seat, "phone", e.target.value)
                          }
                          placeholder="Phone No"
                          className="p-2 border rounded-md w-1/3"
                          required
                        />
                        <input
                          type="text"
                          value={idNumber}
                          onChange={(e) =>
                            handleInputChange(seat, "idNumber", e.target.value)
                          }
                          placeholder="ID Number"
                          className="p-2 border rounded-md w-1/3"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Selected Seats:
                </label>
                <div className="bg-white p-2 rounded-md min-h-[40px] border">
                  {selectedSeats.length > 0
                    ? selectedSeats.join(", ")
                    : "No seats selected"}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Total Price:{" "}
                  <span className="font-bold">
                    {formatAmount(selectedSeats.length * route.amount)} /=
                  </span>
                </h3>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={selectedSeats.length === 0}
                >
                  Make Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
