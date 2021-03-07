/*
  Warnings:

  - You are about to drop the column `userId` on the `UserCapability` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCapability" DROP CONSTRAINT "UserCapability_userId_fkey";

-- AlterTable
ALTER TABLE "UserCapability" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserToUserCapability" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserCapability_AB_unique" ON "_UserToUserCapability"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserCapability_B_index" ON "_UserToUserCapability"("B");

-- AddForeignKey
ALTER TABLE "_UserToUserCapability" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserCapability" ADD FOREIGN KEY ("B") REFERENCES "UserCapability"("id") ON DELETE CASCADE ON UPDATE CASCADE;
