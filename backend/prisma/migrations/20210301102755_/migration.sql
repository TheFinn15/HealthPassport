-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "timeWork" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "about" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner.name_unique" ON "Partner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Partner.url_unique" ON "Partner"("url");
