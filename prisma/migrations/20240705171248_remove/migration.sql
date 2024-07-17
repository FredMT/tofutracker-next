-- AlterTable
ALTER TABLE "episodes" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "episodes_id_seq";

-- CreateIndex
CREATE INDEX "credit_id_idx" ON "cast"("credit_id");
