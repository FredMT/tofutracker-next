/*
  Warnings:

  - Made the column `media_id` on table `episodes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "episodes" DROP CONSTRAINT "episodes_media_id_fkey";

-- AlterTable
ALTER TABLE "episodes" ALTER COLUMN "media_id" SET NOT NULL,
ALTER COLUMN "air_date" DROP NOT NULL,
ALTER COLUMN "episode_number" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "overview" DROP NOT NULL,
ALTER COLUMN "runtime" DROP NOT NULL,
ALTER COLUMN "still_path" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "vote_count" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
