/*
  Warnings:

  - You are about to drop the `Ill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Survey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vaccine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IllToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SurveyToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToVaccine` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserCapability" AS ENUM ('PERSON_NOT_VALID_FOR_PUBLIC', 'PERSON_HAVE_CONSTRAINTS', 'PERSON_IS_CLEAN');

-- CreateEnum
CREATE TYPE "TypeServices" AS ENUM ('TYPE_SURVEY', 'TYPE_VACCINE', 'TYPE_ILL');

-- DropForeignKey
ALTER TABLE "_IllToUser" DROP CONSTRAINT "_IllToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_IllToUser" DROP CONSTRAINT "_IllToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_SurveyToUser" DROP CONSTRAINT "_SurveyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SurveyToUser" DROP CONSTRAINT "_SurveyToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserToVaccine" DROP CONSTRAINT "_UserToVaccine_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToVaccine" DROP CONSTRAINT "_UserToVaccine_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "capabilities" "UserCapability" NOT NULL DEFAULT E'PERSON_IS_CLEAN';

-- DropEnum
DROP TYPE "Capability" CASCADE;

-- CreateTable
CREATE TABLE "SupplierServices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TypeServices" NOT NULL DEFAULT E'TYPE_SURVEY',
    "about" TEXT,
    "info" TEXT,
    "partnerId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SupplierServicesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- DropTable
DROP TABLE "Ill";

-- DropTable
DROP TABLE "Survey";

-- DropTable
DROP TABLE "Vaccine";

-- DropTable
DROP TABLE "_IllToUser";

-- DropTable
DROP TABLE "_SurveyToUser";

-- DropTable
DROP TABLE "_UserToVaccine";

-- CreateIndex
CREATE UNIQUE INDEX "SupplierServices.name_unique" ON "SupplierServices"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SupplierServicesToUser_AB_unique" ON "_SupplierServicesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SupplierServicesToUser_B_index" ON "_SupplierServicesToUser"("B");

-- AddForeignKey
ALTER TABLE "SupplierServices" ADD FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierServicesToUser" ADD FOREIGN KEY ("A") REFERENCES "SupplierServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierServicesToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
