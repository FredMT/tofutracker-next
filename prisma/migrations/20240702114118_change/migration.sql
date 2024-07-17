/*
  Warnings:

  - The primary key for the `anidb_mapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `anidb_id` on the `anidb_mapping` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `tvdb_id` on the `anidb_mapping` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `tmdb_id` on the `anidb_mapping` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `mal_id` on the `anidb_mapping` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `anilist_id` on the `anidb_mapping` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `livechart_id` on the `anidb_mapping` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "anidb_mapping" DROP CONSTRAINT "anidb_mapping_pkey",
ALTER COLUMN "anidb_id" SET DATA TYPE INTEGER,
ALTER COLUMN "tvdb_id" SET DATA TYPE INTEGER,
ALTER COLUMN "tmdb_id" SET DATA TYPE INTEGER,
ALTER COLUMN "mal_id" SET DATA TYPE INTEGER,
ALTER COLUMN "anilist_id" SET DATA TYPE INTEGER,
ALTER COLUMN "livechart_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "anidb_mapping_pkey" PRIMARY KEY ("anidb_id");

-- CreateTable
CREATE TABLE "anidb_anime" (
    "id" INTEGER NOT NULL,
    "english_title" TEXT,
    "japanese_title" TEXT,
    "chinese_title" TEXT,
    "korean_title" TEXT,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "description" TEXT,
    "poster" TEXT,
    "episode_count" INTEGER,
    "type" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "anidb_anime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anidb_anime_id_key" ON "anidb_anime"("id");

-- CreateIndex
CREATE INDEX "anidb_anime_id_idx" ON "anidb_anime"("id");
