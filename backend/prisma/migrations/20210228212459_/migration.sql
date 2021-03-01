-- CreateEnum
CREATE TYPE "Capability" AS ENUM ('PERSON_NOT_VALID_FOR_PUBLIC', 'PERSON_HAVE_CONSTRAINTS', 'PERSON_IS_CLEAN');

-- AlterTable
ALTER TABLE "Ill" ADD COLUMN     "type" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "about" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "info" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "capabilities" "Capability" NOT NULL DEFAULT E'PERSON_IS_CLEAN';

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT E'',
    "about" TEXT NOT NULL DEFAULT E'',
    "info" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT E'',
    "about" TEXT NOT NULL DEFAULT E'',
    "info" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToVaccine" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SurveyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey.name_unique" ON "Survey"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vaccine.name_unique" ON "Vaccine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVaccine_AB_unique" ON "_UserToVaccine"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVaccine_B_index" ON "_UserToVaccine"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SurveyToUser_AB_unique" ON "_SurveyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SurveyToUser_B_index" ON "_SurveyToUser"("B");

-- AddForeignKey
ALTER TABLE "_UserToVaccine" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVaccine" ADD FOREIGN KEY ("B") REFERENCES "Vaccine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SurveyToUser" ADD FOREIGN KEY ("A") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SurveyToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
