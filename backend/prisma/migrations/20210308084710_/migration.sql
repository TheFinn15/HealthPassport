/*
  Warnings:

  - You are about to drop the column `result` on the `SupplierServices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SupplierServices" DROP COLUMN "result";

-- DropEnum
DROP TYPE "ResultSurvey";

-- CreateTable
CREATE TABLE "ResultSurvey" (
    "id" SERIAL NOT NULL,
    "info" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResultSurveyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ResultSurveyToSupplierServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResultSurveyToUser_AB_unique" ON "_ResultSurveyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ResultSurveyToUser_B_index" ON "_ResultSurveyToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResultSurveyToSupplierServices_AB_unique" ON "_ResultSurveyToSupplierServices"("A", "B");

-- CreateIndex
CREATE INDEX "_ResultSurveyToSupplierServices_B_index" ON "_ResultSurveyToSupplierServices"("B");

-- AddForeignKey
ALTER TABLE "_ResultSurveyToUser" ADD FOREIGN KEY ("A") REFERENCES "ResultSurvey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResultSurveyToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResultSurveyToSupplierServices" ADD FOREIGN KEY ("A") REFERENCES "ResultSurvey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResultSurveyToSupplierServices" ADD FOREIGN KEY ("B") REFERENCES "SupplierServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
