-- AlterTable
ALTER TABLE "UserCapability" ADD COLUMN     "illId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserCapability" ADD FOREIGN KEY ("illId") REFERENCES "SupplierServices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
