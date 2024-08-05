/*
  Warnings:

  - You are about to drop the column `adult` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop_path` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `first_air_date` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `homepage` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `imdb_id` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `in_production` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `last_air_date` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `number_of_episodes` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `number_of_seasons` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `original_language` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `original_title` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `popularity` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `revenue` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `runtime` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `vote_average` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `vote_count` on the `media` table. All the data in the column will be lost.
  - Added the required column `media_id` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "adult",
DROP COLUMN "backdrop_path",
DROP COLUMN "budget",
DROP COLUMN "first_air_date",
DROP COLUMN "homepage",
DROP COLUMN "imdb_id",
DROP COLUMN "in_production",
DROP COLUMN "last_air_date",
DROP COLUMN "number_of_episodes",
DROP COLUMN "number_of_seasons",
DROP COLUMN "original_language",
DROP COLUMN "original_title",
DROP COLUMN "overview",
DROP COLUMN "popularity",
DROP COLUMN "poster_path",
DROP COLUMN "release_date",
DROP COLUMN "revenue",
DROP COLUMN "runtime",
DROP COLUMN "status",
DROP COLUMN "tagline",
DROP COLUMN "title",
DROP COLUMN "type",
DROP COLUMN "video",
DROP COLUMN "vote_average",
DROP COLUMN "vote_count",
ADD COLUMN     "media_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "movies" (
    "id" INTEGER NOT NULL,
    "adult" BOOLEAN,
    "backdrop_path" TEXT,
    "budget" BIGINT,
    "homepage" TEXT,
    "imdb_id" TEXT,
    "original_language" TEXT,
    "original_title" TEXT,
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "poster_path" TEXT,
    "release_date" TIMESTAMP(3),
    "revenue" BIGINT,
    "runtime" INTEGER,
    "status" TEXT,
    "tagline" TEXT,
    "title" TEXT NOT NULL,
    "video" BOOLEAN,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shows" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "adult" BOOLEAN,
    "backdrop_path" TEXT,
    "homepage" TEXT,
    "original_language" TEXT,
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "poster_path" TEXT,
    "first_air_date" TIMESTAMP(3),
    "in_production" BOOLEAN,
    "last_air_date" TIMESTAMP(3),
    "number_of_episodes" INTEGER,
    "number_of_seasons" INTEGER,
    "type" TEXT,
    "rating" DOUBLE PRECISION,
    "status" TEXT,
    "tagline" TEXT,
    "last_episode_to_air" JSONB,
    "next_episode_to_air" JSONB,
    "episode_count" INTEGER,
    "vote_count" INTEGER,

    CONSTRAINT "shows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_key" ON "movies"("id");

-- CreateIndex
CREATE INDEX "movies_id_idx" ON "movies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shows_id_key" ON "shows"("id");

-- CreateIndex
CREATE INDEX "shows_id_idx" ON "shows"("id");
