-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "gender" TEXT,
    "age" INTEGER,
    "avatarUrl" TEXT,
    "phone" TEXT,
    "licenseNo" TEXT NOT NULL,
    "experience" INTEGER NOT NULL
);
INSERT INTO "new_Driver" ("age", "avatarUrl", "email", "experience", "firstName", "gender", "id", "lastName", "licenseNo", "passwordHash", "phone") SELECT "age", "avatarUrl", "email", "experience", "firstName", "gender", "id", "lastName", "licenseNo", "passwordHash", "phone" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");
CREATE UNIQUE INDEX "Driver_phone_key" ON "Driver"("phone");
CREATE UNIQUE INDEX "Driver_licenseNo_key" ON "Driver"("licenseNo");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PASSENGER',
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("age", "avatarUrl", "createdAt", "email", "firstName", "gender", "id", "lastName", "passwordHash", "phone", "role") SELECT "age", "avatarUrl", "createdAt", "email", "firstName", "gender", "id", "lastName", "passwordHash", "phone", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
