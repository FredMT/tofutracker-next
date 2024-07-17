-- AlterTable
ALTER TABLE "crew" ADD COLUMN     "season_id" INTEGER;

-- CreateIndex
CREATE INDEX "crew_season_id_idx" ON "crew"("season_id");

-- AddForeignKey
ALTER TABLE "crew" ADD CONSTRAINT "crew_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
