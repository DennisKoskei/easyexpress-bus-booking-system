-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userAge" INTEGER NOT NULL,
    "userPassword" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "userAvatar" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Routes" (
    "routeId" TEXT NOT NULL PRIMARY KEY,
    "departure" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" DATETIME NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Tickets" (
    "ticketId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" DATETIME NOT NULL,
    "ticketPrice" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Bus" (
    "busId" TEXT NOT NULL PRIMARY KEY,
    "busPlate" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "routeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BusSeat" (
    "seatId" TEXT NOT NULL PRIMARY KEY,
    "seat_no" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
