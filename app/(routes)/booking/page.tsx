"use client";

import React, { useState } from "react";
import { FaBus, FaCheckCircle } from "react-icons/fa";

const BookingPage: React.FC = () => {
  const totalSeats = 40;
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [passengerDetails, setPassengerDetails] = useState<
    { seat: number; name: string; phone: string; idNumber: string }[]
  >([]);

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

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-6">
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
            {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seat) => (
              <button
                key={seat}
                className={`w-12 h-12 flex items-center justify-center border rounded-md font-semibold ${selectedSeats.includes(seat)
                    ? "bg-green-600 text-white"
                    : "bg-gray-300"
                  }`}
                onClick={() => toggleSeatSelection(seat)}
              >
                {selectedSeats.includes(seat) ? <FaCheckCircle /> : seat}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="w-full md:w-2/3 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-wrap justify-between mb-4">
            <div className="w-1/3 p-4 bg-gray-200 rounded-lg">
              <FaBus className="text-blue-700 text-3xl mx-auto" />
              <p className="text-center mt-2 font-bold">Nairobi - Kericho</p>
            </div>
            <div className="w-2/3 p-4 bg-gray-200 rounded-lg">
              <p className="text-lg font-semibold">
                Departure: <span className="font-normal">10:00 AM</span>
              </p>
              <p className="text-lg font-semibold">
                Arrival: <span className="font-normal">04:00 PM</span>
              </p>
              <p className="text-lg font-semibold">
                Price per Seat: <span className="font-normal">1500 /=</span>
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="p-4 bg-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Booking Submission</h2>
            <form className="px-2">
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
                    {selectedSeats.length * 1500} /=
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
