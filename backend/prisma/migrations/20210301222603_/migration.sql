/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[token]` on the table `Token`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token.token_unique" ON "Token"("token");
