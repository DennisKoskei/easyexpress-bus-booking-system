import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Users
  const user1 = await prisma.user.create({
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
  });

  const user2 = await prisma.user.create({
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
  });

  const user3 = await prisma.user.create({
    data: {
      firstName: "Elanor",
      lastName: "Smith",
      email: "elanor.smith@example.com",
      phone: "0722334455",
      passwordHash: "hashedpassword923",
      gender: "MALE",
      age: 30,
      role: "PASSENGER",
    },
  });

  const user4 = await prisma.user.create({
    data: {
      firstName: "Alex",
      lastName: "Kamini",
      email: "alex.kamini@example.com",
      phone: "0733445566",
      passwordHash: "hashedpassword923",
      gender: "MALE",
      age: 30,
      role: "PASSENGER",
    },
  });

  const user5 = await prisma.user.create({
    data: {
      firstName: "Proce",
      lastName: "Elixir",
      email: "proce.elixir@example.com",
      phone: "0744556677",
      passwordHash: "hashedpassword923",
      gender: "MALE",
      age: 30,
      role: "PASSENGER",
    },
  });

  const user6 = await prisma.user.create({
    data: {
      firstName: "James",
      lastName: "Gunn",
      email: "james.gunn@example.com",
      phone: "0755667788",
      passwordHash: "hashedpassword923",
      gender: "MALE",
      age: 30,
      role: "PASSENGER",
    },
  });

  const user7 = await prisma.user.create({
    data: {
      firstName: "Goliato",
      lastName: "Budai",
      email: "goliato.budai@example.com",
      phone: "0766778899",
      passwordHash: "hashedpassword923",
      gender: "MALE",
      age: 30,
      role: "PASSENGER",
    },
  });

  const user8 = await prisma.user.create({
    data: {
      firstName: "Scarlett",
      lastName: "Witch",
      email: "scarlett.witch@example.com",
      phone: "0700112233",
      passwordHash: "hashedpassword923",
      gender: "MALE",
      age: 30,
      role: "PASSENGER",
    },
  });

  const user9 = await prisma.user.create({
    data: {
      firstName: "Tony",
      lastName: "Stark",
      email: "tony.stark@example.com",
      phone: "0705123456",
      passwordHash: "hashedpassword923",
      gender: "MALE",
      age: 30,
      role: "PASSENGER",
    },
  });

  const user10 = await prisma.user.create({
    data: {
      firstName: "Peter",
      lastName: "Parker",
      email: "peter.parker@example.com",
      phone: "0711558822",
      passwordHash: "hashedpassword923",
      gender: "MALE",
      age: 30,
      role: "PASSENGER",
    },
  });

  // Create Drivers
  const driver1 = await prisma.driver.create({
    data: {
      firstName: "Mike",
      lastName: "Johnson",
      phone: "0723456789",
      licenseNo: "KBN-123X",
      experience: 5,
    },
  });

  const driver2 = await prisma.driver.create({
    data: {
      firstName: "Mike",
      lastName: "Johnson",
      phone: "0734567890",
      licenseNo: "KCT-234X",
      experience: 5,
    },
  });

  const driver3 = await prisma.driver.create({
    data: {
      firstName: "Mike",
      lastName: "Johnson",
      phone: "0745678901",
      licenseNo: "KBN-124X",
      experience: 5,
    },
  });

  const driver4 = await prisma.driver.create({
    data: {
      firstName: "Mike",
      lastName: "Johnson",
      phone: "0756789012",
      licenseNo: "KAX-112L",
      experience: 5,
    },
  });

  const driver5 = await prisma.driver.create({
    data: {
      firstName: "Mike",
      lastName: "Johnson",
      phone: "0712345678",
      licenseNo: "KBC-001A",
      experience: 5,
    },
  });

  // Create Bus
  const bus1 = await prisma.bus.create({
    data: {
      plateNumber: "KAA-123A",
      totalSeats: 40,
      busAvatar: "https://example.com/bus1.jpg",
      driverId: driver1.id,
    },
  });

  const bus2 = await prisma.bus.create({
    data: {
      plateNumber: "KAA-123B",
      totalSeats: 40,
      busAvatar: "https://example.com/bus1.jpg",
      driverId: driver2.id,
    },
  });

  const bus3 = await prisma.bus.create({
    data: {
      plateNumber: "KAA-123C",
      totalSeats: 40,
      busAvatar: "https://example.com/bus1.jpg",
      driverId: driver3.id,
    },
  });

  const bus4 = await prisma.bus.create({
    data: {
      plateNumber: "KAA-123D",
      totalSeats: 40,
      busAvatar: "https://example.com/bus1.jpg",
      driverId: driver4.id,
    },
  });

  const bus5 = await prisma.bus.create({
    data: {
      plateNumber: "KAA-123E",
      totalSeats: 40,
      busAvatar: "https://example.com/bus1.jpg",
      driverId: driver5.id,
    },
  });

  // Create Route
  const route1 = await prisma.route.create({
    data: {
      departure: "New York",
      destination: "Washington DC",
      date: new Date("2025-05-20"),
      time: "08:00 AM",
      amount: 50.0,
      busId: bus1.id,
    },
  });

  const route2 = await prisma.route.create({
    data: {
      departure: "New York",
      destination: "Washington DC",
      date: new Date("2025-05-20"),
      time: "08:00 AM",
      amount: 50.0,
      busId: bus2.id,
    },
  });

  const route3 = await prisma.route.create({
    data: {
      departure: "New York",
      destination: "Washington DC",
      date: new Date("2025-05-20"),
      time: "08:00 AM",
      amount: 50.0,
      busId: bus3.id,
    },
  });

  const route4 = await prisma.route.create({
    data: {
      departure: "New York",
      destination: "Washington DC",
      date: new Date("2025-05-20"),
      time: "08:00 AM",
      amount: 50.0,
      busId: bus4.id,
    },
  });

  const route5 = await prisma.route.create({
    data: {
      departure: "New York",
      destination: "Washington DC",
      date: new Date("2025-05-20"),
      time: "08:00 AM",
      amount: 50.0,
      busId: bus5.id,
    },
  });

  // Create Seats
  const seat1 = await prisma.seat.create({
    data: {
      busId: bus1.id,
      seatNumber: 1,
      status: "AVAILABLE",
    },
  });

  const seat2 = await prisma.seat.create({
    data: {
      busId: bus2.id,
      seatNumber: 2,
      status: "AVAILABLE",
    },
  });

  const seat3 = await prisma.seat.create({
    data: {
      busId: bus3.id,
      seatNumber: 2,
      status: "AVAILABLE",
    },
  });

  const seat4 = await prisma.seat.create({
    data: {
      busId: bus4.id,
      seatNumber: 2,
      status: "AVAILABLE",
    },
  });

  const seat5 = await prisma.seat.create({
    data: {
      busId: bus5.id,
      seatNumber: 2,
      status: "AVAILABLE",
    },
  });

  // Create Booking
  const booking1 = await prisma.booking.create({
    data: {
      userId: user1.id,
      routeId: route1.id,
      seatId: seat1.id,
      passengerName: user1.firstName + " " + user1.lastName,
      passengerPhone: user1.phone,
      passengerGender: user1.gender,
      status: "PENDING",
    },
  });
  const booking2 = await prisma.booking.create({
    data: {
      userId: user2.id,
      routeId: route1.id,
      seatId: seat1.id,
      passengerName: user1.firstName + " " + user1.lastName,
      passengerPhone: user1.phone,
      passengerGender: user1.gender,
      status: "PENDING",
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      userId: user3.id,
      routeId: route1.id,
      seatId: seat1.id,
      passengerName: user1.firstName + " " + user1.lastName,
      passengerPhone: user1.phone,
      passengerGender: user1.gender,
      status: "PENDING",
    },
  });

  const booking4 = await prisma.booking.create({
    data: {
      userId: user4.id,
      routeId: route1.id,
      seatId: seat1.id,
      passengerName: user1.firstName + " " + user1.lastName,
      passengerPhone: user1.phone,
      passengerGender: user1.gender,
      status: "PENDING",
    },
  });

  const booking5 = await prisma.booking.create({
    data: {
      userId: user5.id,
      routeId: route1.id,
      seatId: seat5.id,
      passengerName: user1.firstName + " " + user1.lastName,
      passengerPhone: user1.phone,
      passengerGender: user1.gender,
      status: "PENDING",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
