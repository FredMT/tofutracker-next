/*
  Warnings:

  - You are about to drop the column `media_type` on the `cast` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `content_ratings` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `crew` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `episodes` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `external_ids` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `item_created_by` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `item_genres` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `item_keywords` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `item_networks` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `item_production_companies` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `item_production_countries` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `item_spoken_languages` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `item_watch_providers` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `origin_country` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `seasons` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `translations` table. All the data in the column will be lost.
  - You are about to drop the column `media_type` on the `videos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[media_id]` on the table `external_ids` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "media_id_media_type_key";

-- AlterTable
ALTER TABLE "cast" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "content_ratings" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "crew" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "episodes" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "external_ids" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "item_created_by" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "item_genres" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "item_keywords" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "item_networks" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "item_production_companies" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "item_production_countries" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "item_spoken_languages" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "item_watch_providers" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "origin_country" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "seasons" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "translations" DROP COLUMN "media_type";

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "media_type";

-- CreateIndex
CREATE UNIQUE INDEX "external_ids_media_id_key" ON "external_ids"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_id_key" ON "media"("id");
