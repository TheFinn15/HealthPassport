/*
  Warnings:

  - You are about to drop the column `about` on the `SupplierServices` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResultSurvey" AS ENUM ('NOT_SURVEY', 'RESULT_POSITIVE', 'RESULT_NEGATIVE');

-- AlterEnum
ALTER TYPE "TypeServices" ADD VALUE 'EMPTY';

-- AlterTable
ALTER TABLE "SupplierServices" DROP COLUMN "about",
ADD COLUMN     "result" "ResultSurvey" NOT NULL DEFAULT E'NOT_SURVEY';
