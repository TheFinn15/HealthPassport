-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "lastOnlineTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
