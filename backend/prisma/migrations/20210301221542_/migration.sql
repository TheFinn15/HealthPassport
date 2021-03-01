-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TokenToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TokenToUser_AB_unique" ON "_TokenToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TokenToUser_B_index" ON "_TokenToUser"("B");

-- AddForeignKey
ALTER TABLE "_TokenToUser" ADD FOREIGN KEY ("A") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TokenToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
