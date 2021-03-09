/*
  Warnings:

  - You are about to drop the column `servicesId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_servicesId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "servicesId";

-- CreateTable
CREATE TABLE "_SupplierServicesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SupplierServicesToUser_AB_unique" ON "_SupplierServicesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SupplierServicesToUser_B_index" ON "_SupplierServicesToUser"("B");

-- AddForeignKey
ALTER TABLE "_SupplierServicesToUser" ADD FOREIGN KEY ("A") REFERENCES "SupplierServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierServicesToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
