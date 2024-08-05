-- AlterTable
ALTER TABLE "cast" ADD COLUMN     "season_id" INTEGER;

-- CreateIndex
CREATE INDEX "cast_season_id_idx" ON "cast"("season_id");

-- AddForeignKey
ALTER TABLE "cast" ADD CONSTRAINT "cast_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
