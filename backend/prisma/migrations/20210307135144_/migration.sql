/*
  Warnings:

  - You are about to drop the column `capabilities` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "capabilities";

-- DropEnum
DROP TYPE "UserCapability";

-- CreateTable
CREATE TABLE "UserCapability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "supplierServicesId" INTEGER NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCapability" ADD FOREIGN KEY ("supplierServicesId") REFERENCES "SupplierServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCapability" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
