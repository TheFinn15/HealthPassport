/*
  Warnings:

  - You are about to drop the column `passingTime` on the `SupplierServices` table. All the data in the column will be lost.
  - You are about to drop the `_SupplierServicesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SupplierServicesToUser" DROP CONSTRAINT "_SupplierServicesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SupplierServicesToUser" DROP CONSTRAINT "_SupplierServicesToUser_B_fkey";

-- AlterTable
ALTER TABLE "ResultSurvey" ADD COLUMN     "passingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "readyTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SupplierServices" DROP COLUMN "passingTime",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "UserCapability" ADD COLUMN     "resultSurveyId" INTEGER;

-- DropTable
DROP TABLE "_SupplierServicesToUser";

-- AddForeignKey
ALTER TABLE "SupplierServices" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCapability" ADD FOREIGN KEY ("resultSurveyId") REFERENCES "ResultSurvey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
