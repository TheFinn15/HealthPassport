-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ROLE_USER', 'ROLE_PARTNER', 'ROLE_ADMIN');

-- CreateEnum
CREATE TYPE "Devices" AS ENUM ('DEVICE_BROWSER', 'DEVICE_ANDROID', 'DEVICE_IOS');

-- CreateEnum
CREATE TYPE "TypeServices" AS ENUM ('EMPTY', 'TYPE_SURVEY', 'TYPE_VACCINE', 'TYPE_ILL');

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "lastOnlineTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeDevice" "Devices" NOT NULL DEFAULT E'DEVICE_BROWSER',
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "pwd" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT E'ROLE_USER',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCapability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultSurvey" (
    "id" SERIAL NOT NULL,
    "info" TEXT NOT NULL,
    "passingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readyTime" TIMESTAMP(3),
    "isSick" BOOLEAN,
    "userId" INTEGER NOT NULL,
    "surveyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierServices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TypeServices" NOT NULL DEFAULT E'TYPE_SURVEY',
    "info" TEXT NOT NULL,
    "partnerId" INTEGER,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Token.ip_unique" ON "Token"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "User.login_unique" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Partner.name_unique" ON "Partner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Partner.url_unique" ON "Partner"("url");

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCapability" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultSurvey" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultSurvey" ADD FOREIGN KEY ("surveyId") REFERENCES "SupplierServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierServices" ADD FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierServices" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
