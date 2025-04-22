import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createSeatsForBus(bus: any) {
  // Generate numeric seat numbers from 1 to totalSeats
  const seatsData = Array.from({ length: bus.totalSeats }, (_, i) => ({
    seatNumber: i + 1,
    busId: bus.id,
  }));
  await prisma.seat.createMany({ data: seatsData });
}

interface AssignedSeat {
  seat: { id: string; seatNumber: number };
  routeSeat: { id: string; seatId: string };
}

async function assignRouteSeats(
  route: any,
  bus: any,
  limit = 5,
): Promise<AssignedSeat[]> {
  // Take first `limit` seats for this route and create RouteSeat entries, returning both
  const seats = await prisma.seat.findMany({
    where: { busId: bus.id },
    take: limit,
  });
  const assigned: AssignedSeat[] = [];
  for (const seat of seats) {
    const routeSeat = await prisma.routeSeat.create({
      data: {
        routeId: route.id,
        seatId: seat.id,
      },
    });
    assigned.push({
      seat: { id: seat.id, seatNumber: seat.seatNumber },
      routeSeat,
    });
  }
  return assigned;
}

async function main() {
  console.log("Seeding database...");

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        passwordHash: "hashedpassword123",
        gender: "MALE",
        age: 30,
        role: "PASSENGER",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+1987654321",
        passwordHash: "hashedpassword456",
        gender: "FEMALE",
        age: 25,
        role: "PASSENGER",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Alice",
        lastName: "Brown",
        email: "alice.brown@example.com",
        phone: "+1112223333",
        passwordHash: "hashedpassword789",
        gender: "FEMALE",
        age: 28,
        role: "PASSENGER",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Bob",
        lastName: "Williams",
        email: "bob.williams@example.com",
        phone: "+4445556666",
        passwordHash: "hashedpassword101",
        gender: "MALE",
        age: 32,
        role: "PASSENGER",
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Clara",
        lastName: "Evans",
        email: "clara.evans@example.com",
        phone: "+7778889999",
        passwordHash: "hashedpassword202",
        gender: "FEMALE",
        age: 27,
        role: "PASSENGER",
      },
    }),
  ]);

  // Create Drivers
  const drivers = await Promise.all([
    prisma.driver.create({
      data: {
        firstName: "Mike",
        lastName: "Johnson",
        phone: "0723456789",
        licenseNo: "KBN-123X",
        experience: 5,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Samuel",
        lastName: "Green",
        phone: "0712345678",
        licenseNo: "KBN-234Y",
        experience: 3,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Eleanor",
        lastName: "Stone",
        phone: "0734567890",
        licenseNo: "KBN-345Z",
        experience: 4,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Henry",
        lastName: "Ford",
        phone: "0700112233",
        licenseNo: "KBN-456A",
        experience: 6,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Grace",
        lastName: "Lewis",
        phone: "0799988776",
        licenseNo: "KBN-567B",
        experience: 2,
      },
    }),
  ]);

  // Create Buses
  const buses = await Promise.all([
    prisma.bus.create({
      data: {
        plateNumber: "KAA-123A",
        totalSeats: 40,
        busAvatar: "https://example.com/bus1.jpg",
        driverId: drivers[0].id,
      },
    }),
    prisma.bus.create({
      data: {
        plateNumber: "KBB-234B",
        totalSeats: 45,
        busAvatar: "https://example.com/bus2.jpg",
        driverId: drivers[1].id,
      },
    }),
    prisma.bus.create({
      data: {
        plateNumber: "KCC-345C",
        totalSeats: 50,
        busAvatar: "https://example.com/bus3.jpg",
        driverId: drivers[2].id,
      },
    }),
    prisma.bus.create({
      data: {
        plateNumber: "KDD-456D",
        totalSeats: 42,
        busAvatar: "https://example.com/bus4.jpg",
        driverId: drivers[3].id,
      },
    }),
    prisma.bus.create({
      data: {
        plateNumber: "KEE-567E",
        totalSeats: 38,
        busAvatar: "https://example.com/bus5.jpg",
        driverId: drivers[4].id,
      },
    }),
  ]);

  // Seed Seats for each Bus
  await Promise.all(buses.map((bus) => createSeatsForBus(bus)));

  // Create Routes
  const routes = await Promise.all([
    prisma.route.create({
      data: {
        departure: "New York",
        destination: "Washington DC",
        date: new Date("2025-05-20"),
        time: "08:00 AM",
        amount: 50.0,
        busId: buses[0].id,
      },
    }),
    prisma.route.create({
      data: {
        departure: "Boston",
        destination: "Philadelphia",
        date: new Date("2025-05-21"),
        time: "09:00 AM",
        amount: 45.0,
        busId: buses[1].id,
      },
    }),
    prisma.route.create({
      data: {
        departure: "Chicago",
        destination: "Detroit",
        date: new Date("2025-05-22"),
        time: "07:30 AM",
        amount: 55.0,
        busId: buses[2].id,
      },
    }),
    prisma.route.create({
      data: {
        departure: "Seattle",
        destination: "Portland",
        date: new Date("2025-05-23"),
        time: "10:00 AM",
        amount: 40.0,
        busId: buses[3].id,
      },
    }),
    prisma.route.create({
      data: {
        departure: "San Francisco",
        destination: "Los Angeles",
        date: new Date("2025-05-24"),
        time: "11:00 AM",
        amount: 60.0,
        busId: buses[4].id,
      },
    }),
  ]);

  // Assign and seed seats to first route as example
  const assigned = await assignRouteSeats(routes[0], buses[0]);

  // Bookings, BookingSeats, Payments, Tickets for example route
  for (let i = 0; i < assigned.length; i++) {
    const { seat, routeSeat } = assigned[i];
    const user = users[i];
    const bookingStatus = ["PENDING", "PAID", "CANCELED"][i % 3] as any;
    const paymentMethod = ["MPESA", "PAYPAL"][i % 2] as any;
    const paymentStatus = ["SUCCESSFUL", "FAILED"][i % 2] as any;
    const transactionId = `TXN${Date.now()}${i}`;

    // Create Booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        routeId: routes[0].id,
        passengerName: `${user.firstName} ${user.lastName}`,
        passengerPhone: user.phone,
        passengerGender: user.gender,
        status: bookingStatus,
      },
    });

    // Link BookingSeat properly using routeSeat id
    const bookingSeat = await prisma.bookingSeat.create({
      data: { bookingId: booking.id, routeSeatId: routeSeat.id },
    });

    // Create Payment
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amountPaid: routes[0].amount,
        paymentMethod: paymentMethod,
        transactionId: transactionId,
        status: paymentStatus,
      },
    });

    // Create Ticket
    await prisma.ticket.create({
      data: {
        passengerId: user.id,
        bookingSeatId: bookingSeat.id,
        routeId: routes[0].id,
        seatNumber: seat.seatNumber,
        busPlate: buses[0].plateNumber,
        price: routes[0].amount,
        qrCode: `QR${Date.now()}${i}`,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
