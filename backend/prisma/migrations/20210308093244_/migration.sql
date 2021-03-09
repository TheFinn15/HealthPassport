/*
  Warnings:

  - You are about to drop the column `supplierServicesId` on the `UserCapability` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCapability" DROP CONSTRAINT "UserCapability_supplierServicesId_fkey";

-- AlterTable
ALTER TABLE "UserCapability" DROP COLUMN "supplierServicesId";
