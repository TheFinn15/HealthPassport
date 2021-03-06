/*
  Warnings:

  - Added the required column `passingTime` to the `SupplierServices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SupplierServices" ADD COLUMN     "passingTime" TIMESTAMP(3) NOT NULL;
