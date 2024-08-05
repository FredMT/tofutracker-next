/*
  Warnings:

  - You are about to drop the `user_episode_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_media_notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_media_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_season_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_episode_status" DROP CONSTRAINT "user_episode_status_episode_id_fkey";

-- DropForeignKey
ALTER TABLE "user_media_notes" DROP CONSTRAINT "user_media_notes_episode_id_fkey";

-- DropForeignKey
ALTER TABLE "user_media_notes" DROP CONSTRAINT "user_media_notes_media_id_fkey";

-- DropForeignKey
ALTER TABLE "user_media_notes" DROP CONSTRAINT "user_media_notes_season_id_fkey";

-- DropForeignKey
ALTER TABLE "user_media_status" DROP CONSTRAINT "user_media_status_last_watched_episode_id_fkey";

-- DropForeignKey
ALTER TABLE "user_media_status" DROP CONSTRAINT "user_media_status_media_id_fkey";

-- DropForeignKey
ALTER TABLE "user_season_status" DROP CONSTRAINT "user_season_status_last_watched_episode_id_fkey";

-- DropForeignKey
ALTER TABLE "user_season_status" DROP CONSTRAINT "user_season_status_season_id_fkey";

-- DropTable
DROP TABLE "user_episode_status";

-- DropTable
DROP TABLE "user_media_notes";

-- DropTable
DROP TABLE "user_media_status";

-- DropTable
DROP TABLE "user_season_status";

-- DropEnum
DROP TYPE "WatchStatus";
