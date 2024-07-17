/*
  Warnings:

  - You are about to drop the column `media_id` on the `media` table. All the data in the column will be lost.
  - You are about to drop the `movies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shows` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cast" DROP CONSTRAINT "cast_media_id_fkey";

-- DropForeignKey
ALTER TABLE "content_ratings" DROP CONSTRAINT "content_ratings_media_id_fkey";

-- DropForeignKey
ALTER TABLE "crew" DROP CONSTRAINT "crew_media_id_fkey";

-- DropForeignKey
ALTER TABLE "episodes" DROP CONSTRAINT "episodes_media_id_fkey";

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

-- AlterTable
ALTER TABLE "media" DROP COLUMN "media_id",
ADD COLUMN     "adult" BOOLEAN,
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "budget" BIGINT,
ADD COLUMN     "first_air_date" TIMESTAMP(3),
ADD COLUMN     "homepage" TEXT,
ADD COLUMN     "imdb_id" TEXT,
ADD COLUMN     "in_production" BOOLEAN,
ADD COLUMN     "last_air_date" TIMESTAMP(3),
ADD COLUMN     "number_of_episodes" INTEGER,
ADD COLUMN     "number_of_seasons" INTEGER,
ADD COLUMN     "original_language" TEXT,
ADD COLUMN     "original_title" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "popularity" DOUBLE PRECISION,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "release_date" TIMESTAMP(3),
ADD COLUMN     "revenue" BIGINT,
ADD COLUMN     "runtime" INTEGER,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "video" BOOLEAN,
ADD COLUMN     "vote_average" DOUBLE PRECISION,
ADD COLUMN     "vote_count" INTEGER;

-- DropTable
DROP TABLE "movies";

-- DropTable
DROP TABLE "shows";

-- AddForeignKey
ALTER TABLE "origin_country" ADD CONSTRAINT "origin_country_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cast" ADD CONSTRAINT "cast_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_ratings" ADD CONSTRAINT "content_ratings_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew" ADD CONSTRAINT "crew_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_ids" ADD CONSTRAINT "external_ids_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_created_by" ADD CONSTRAINT "item_created_by_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_genres" ADD CONSTRAINT "item_genres_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_keywords" ADD CONSTRAINT "item_keywords_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_networks" ADD CONSTRAINT "item_networks_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_production_companies" ADD CONSTRAINT "item_production_companies_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_production_countries" ADD CONSTRAINT "item_production_countries_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_spoken_languages" ADD CONSTRAINT "item_spoken_languages_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_watch_providers" ADD CONSTRAINT "item_watch_providers_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translations" ADD CONSTRAINT "translations_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
