/*
  Warnings:

  - A unique constraint covering the columns `[id,media_type]` on the table `media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `media_type` to the `cast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `content_ratings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `crew` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `episodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `external_ids` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `item_created_by` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `item_genres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `item_keywords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `item_networks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `item_production_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `item_production_countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `item_spoken_languages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `item_watch_providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `origin_country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `seasons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `translations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cast" DROP CONSTRAINT "cast_media_id_fkey";

-- DropForeignKey
ALTER TABLE "content_ratings" DROP CONSTRAINT "content_ratings_media_id_fkey";

-- DropForeignKey
ALTER TABLE "crew" DROP CONSTRAINT "crew_media_id_fkey";

-- DropForeignKey
ALTER TABLE "episodes" DROP CONSTRAINT "episodes_season_id_fkey";

-- DropForeignKey
ALTER TABLE "external_ids" DROP CONSTRAINT "external_ids_media_id_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_media_id_fkey";

-- DropForeignKey
ALTER TABLE "item_created_by" DROP CONSTRAINT "item_created_by_media_id_fkey";

-- DropForeignKey
ALTER TABLE "item_genres" DROP CONSTRAINT "item_genres_media_id_fkey";

-- DropForeignKey
ALTER TABLE "item_keywords" DROP CONSTRAINT "item_keywords_media_id_fkey";

-- DropForeignKey
ALTER TABLE "item_networks" DROP CONSTRAINT "item_networks_media_id_fkey";

-- DropForeignKey
ALTER TABLE "item_production_companies" DROP CONSTRAINT "item_production_companies_media_id_fkey";

-- DropForeignKey
ALTER TABLE "item_production_countries" DROP CONSTRAINT "item_production_countries_media_id_fkey";

-- DropForeignKey
ALTER TABLE "item_spoken_languages" DROP CONSTRAINT "item_spoken_languages_media_id_fkey";

-- DropForeignKey
ALTER TABLE "item_watch_providers" DROP CONSTRAINT "item_watch_providers_media_id_fkey";

-- DropForeignKey
ALTER TABLE "origin_country" DROP CONSTRAINT "origin_country_media_id_fkey";

-- DropForeignKey
ALTER TABLE "seasons" DROP CONSTRAINT "seasons_media_id_fkey";

-- DropForeignKey
ALTER TABLE "translations" DROP CONSTRAINT "translations_media_id_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_media_id_fkey";

-- DropIndex
DROP INDEX "external_ids_media_id_key";

-- DropIndex
DROP INDEX "media_id_key";

-- AlterTable
ALTER TABLE "cast" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "content_ratings" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "crew" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "episodes" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "external_ids" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "item_created_by" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "item_genres" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "item_keywords" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "item_networks" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "item_production_companies" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "item_production_countries" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "item_spoken_languages" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "item_watch_providers" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "origin_country" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "seasons" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "translations" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "media_type" "MediaType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "media_id_media_type_key" ON "media"("id", "media_type");

-- AddForeignKey
ALTER TABLE "origin_country" ADD CONSTRAINT "origin_country_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cast" ADD CONSTRAINT "cast_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_ratings" ADD CONSTRAINT "content_ratings_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew" ADD CONSTRAINT "crew_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_ids" ADD CONSTRAINT "external_ids_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_created_by" ADD CONSTRAINT "item_created_by_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_genres" ADD CONSTRAINT "item_genres_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_keywords" ADD CONSTRAINT "item_keywords_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_networks" ADD CONSTRAINT "item_networks_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_production_companies" ADD CONSTRAINT "item_production_companies_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_production_countries" ADD CONSTRAINT "item_production_countries_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_spoken_languages" ADD CONSTRAINT "item_spoken_languages_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_watch_providers" ADD CONSTRAINT "item_watch_providers_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translations" ADD CONSTRAINT "translations_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
