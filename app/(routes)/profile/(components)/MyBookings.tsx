import React from 'react'

const MyBookings = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        My Bookings
      </h2>
      <div className="space-y-2">
        <div className="bg-white p-4 rounded-md shadow-md">
          <p className="text-gray-700">
            🚍 Nairobi → Mombasa | 12th Feb, 10:00 AM
          </p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <p className="text-gray-700">
            🚍 Kisumu → Nairobi | 18th Feb, 5:00 PM
          </p>
        </div>
      </div>
    </section>
  )
}

export default MyBookings
