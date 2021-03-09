/*
  Warnings:

  - You are about to drop the column `userId` on the `SupplierServices` table. All the data in the column will be lost.
  - You are about to drop the column `resultSurveyId` on the `UserCapability` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SupplierServices" DROP CONSTRAINT "SupplierServices_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCapability" DROP CONSTRAINT "UserCapability_resultSurveyId_fkey";

-- AlterTable
ALTER TABLE "SupplierServices" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "servicesId" INTEGER;

-- AlterTable
ALTER TABLE "UserCapability" DROP COLUMN "resultSurveyId";

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("servicesId") REFERENCES "SupplierServices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
