/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[ip]` on the table `Token`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "Token.token_unique";

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "ip" TEXT,
ADD COLUMN     "location" TEXT,
ALTER COLUMN "token" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token.ip_unique" ON "Token"("ip");
