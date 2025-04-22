/*
  Warnings:

  - You are about to drop the column `seatId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `seatId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `bookingSeatId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatNumber` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "RouteSeat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "routeId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    CONSTRAINT "RouteSeat_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RouteSeat_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookingSeat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingId" TEXT NOT NULL,
    "routeSeatId" TEXT NOT NULL,
    CONSTRAINT "BookingSeat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookingSeat_routeSeatId_fkey" FOREIGN KEY ("routeSeatId") REFERENCES "RouteSeat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "passengerName" TEXT NOT NULL,
    "passengerPhone" TEXT NOT NULL,
    "passengerGender" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("createdAt", "id", "passengerGender", "passengerName", "passengerPhone", "routeId", "status", "userId") SELECT "createdAt", "id", "passengerGender", "passengerName", "passengerPhone", "routeId", "status", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "busId" TEXT NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    CONSTRAINT "Seat_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("busId", "id", "seatNumber") SELECT "busId", "id", "seatNumber" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE TABLE "new_Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "passengerId" TEXT NOT NULL,
    "bookingSeatId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "busPlate" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "qrCode" TEXT NOT NULL,
    CONSTRAINT "Ticket_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_bookingSeatId_fkey" FOREIGN KEY ("bookingSeatId") REFERENCES "BookingSeat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ticket" ("busPlate", "id", "passengerId", "price", "qrCode", "routeId") SELECT "busPlate", "id", "passengerId", "price", "qrCode", "routeId" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
CREATE UNIQUE INDEX "Ticket_bookingSeatId_key" ON "Ticket"("bookingSeatId");
CREATE UNIQUE INDEX "Ticket_qrCode_key" ON "Ticket"("qrCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "RouteSeat_routeId_seatId_key" ON "RouteSeat"("routeId", "seatId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingSeat_routeSeatId_key" ON "BookingSeat"("routeSeatId");
