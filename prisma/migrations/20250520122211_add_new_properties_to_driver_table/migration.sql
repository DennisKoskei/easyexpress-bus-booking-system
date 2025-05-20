-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT,
    "gender" TEXT,
    "age" INTEGER,
    "avatarUrl" TEXT,
    "phone" TEXT,
    "licenseNo" TEXT NOT NULL,
    "experience" INTEGER NOT NULL
);
INSERT INTO "new_Driver" ("avatarUrl", "experience", "firstName", "id", "lastName", "licenseNo", "phone") SELECT "avatarUrl", "experience", "firstName", "id", "lastName", "licenseNo", "phone" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");
CREATE UNIQUE INDEX "Driver_phone_key" ON "Driver"("phone");
CREATE UNIQUE INDEX "Driver_licenseNo_key" ON "Driver"("licenseNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
