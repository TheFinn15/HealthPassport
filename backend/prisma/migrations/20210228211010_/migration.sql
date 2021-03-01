/*
  Warnings:

  - You are about to drop the column `userId` on the `Ill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ill" DROP CONSTRAINT "Ill_userId_fkey";

-- AlterTable
ALTER TABLE "Ill" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_IllToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IllToUser_AB_unique" ON "_IllToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_IllToUser_B_index" ON "_IllToUser"("B");

-- AddForeignKey
ALTER TABLE "_IllToUser" ADD FOREIGN KEY ("A") REFERENCES "Ill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IllToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
