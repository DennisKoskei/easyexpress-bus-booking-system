import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Users
  await prisma.user.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "0700000001",
        passwordHash: "hashedpassword123",
        gender: "MALE",
        age: 30,
        role: "PASSENGER",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "0700000002",
        passwordHash: "hashedpassword456",
        gender: "FEMALE",
        age: 28,
        role: "PASSENGER",
      },
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        phone: "0700000003",
        passwordHash: "adminhashedpassword",
        gender: "OTHER",
        age: 35,
        role: "ADMIN",
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        phone: "0700000004",
        passwordHash: "hashedpassword789",
        gender: "FEMALE",
        age: 24,
        role: "PASSENGER",
      },
      {
        firstName: "Bob",
        lastName: "Williams",
        email: "bob.williams@example.com",
        phone: "0700000005",
        passwordHash: "hashedpassword321",
        gender: "MALE",
        age: 40,
        role: "PASSENGER",
      },
    ],
  });

  // Create Drivers
  await prisma.driver.createMany({
    data: [
      {
        firstName: "Michael",
        lastName: "Brown",
        phone: "0711000001",
        licenseNo: "LIC001",
        experience: 10,
      },
      {
        firstName: "Sarah",
        lastName: "Connor",
        phone: "0711000002",
        licenseNo: "LIC002",
        experience: 8,
      },
      {
        firstName: "David",
        lastName: "Martinez",
        phone: "0711000003",
        licenseNo: "LIC003",
        experience: 12,
      },
      {
        firstName: "Emily",
        lastName: "Clark",
        phone: "0711000004",
        licenseNo: "LIC004",
        experience: 6,
      },
      {
        firstName: "Robert",
        lastName: "White",
        phone: "0711000005",
        licenseNo: "LIC005",
        experience: 15,
      },
    ],
  });

  // Fetch Drivers
  const allDrivers = await prisma.driver.findMany();

  // Create Buses
  await prisma.bus.createMany({
    data: allDrivers.map((driver, index) => ({
      plateNumber: `KBB00${index + 1}A`,
      totalSeats: 50,
      driverId: driver.id,
    })),
  });

  // Fetch Buses
  const allBuses = await prisma.bus.findMany();

  // Create Routes
  await prisma.route.createMany({
    data: allBuses.map((bus, index) => ({
      departure: ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Kampala"][index],
      destination: ["Mombasa", "Nairobi", "Eldoret", "Kampala", "Arusha"][
        index
      ],
      date: new Date(),
      time: ["08:00 AM", "12:30 PM", "15:00 PM", "18:45 PM", "20:00 PM"][index],
      amount: 5000 + index * 1000,
      busId: bus.id,
    })),
  });

  // Fetch Routes
  const allRoutes = await prisma.route.findMany();

  // Create Seats
  for (const bus of allBuses) {
    await prisma.seat.createMany({
      data: Array.from({ length: 5 }, (_, i) => ({
        busId: bus.id,
        seatNumber: i + 1,
        status: "AVAILABLE",
      })),
    });
  }

  // Fetch Seats
  const allSeats = await prisma.seat.findMany();

  // Fetch Users
  const allUsers = await prisma.user.findMany();

  // Create Bookings
  await prisma.booking.createMany({
    data: allUsers.map((user, index) => ({
      userId: user.id,
      routeId: allRoutes[index].id,
      seatId: allSeats[index].id,
      passengerName: `${user.firstName} ${user.lastName}`,
      passengerPhone: user.phone,
      passengerGender: user.gender,
      status: "PENDING",
    })),
  });

  // Fetch Bookings
  const allBookings = await prisma.booking.findMany();

  // Create Payments
  await prisma.payment.createMany({
    data: allBookings.map((booking, index) => ({
      bookingId: booking.id,
      amountPaid: allRoutes[index].amount,
      paymentMethod: index % 2 === 0 ? "MPESA" : "PAYPAL",
      transactionId: `TXN00${index + 1}`,
      status: "SUCCESSFUL",
    })),
  });

  // Create Tickets
  await prisma.ticket.createMany({
    data: allBookings.map((booking, index) => ({
      passengerId: booking.userId,
      bookingId: booking.id,
      routeId: booking.routeId,
      seatId: booking.seatId,
      busPlate: allBuses[index].plateNumber,
      price: allRoutes[index].amount,
      qrCode: `QR00${index + 1}`,
    })),
  });

  console.log("✅ Sample data inserted successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Error inserting sample data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
