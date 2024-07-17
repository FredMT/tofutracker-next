-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('COMPLETED', 'PLAN_TO_WATCH', 'WATCHING', 'DROPPED');

-- CreateTable
CREATE TABLE "user_media_status" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "status" "WatchStatus" NOT NULL,
    "watch_count" INTEGER NOT NULL DEFAULT 0,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "last_watched_date" TIMESTAMP(3),
    "last_watched_episode_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_media_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_season_status" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "season_id" INTEGER NOT NULL,
    "status" "WatchStatus" NOT NULL,
    "watch_count" INTEGER NOT NULL DEFAULT 0,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "last_watched_date" TIMESTAMP(3),
    "last_watched_episode_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_season_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_episode_status" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "episode_id" INTEGER NOT NULL,
    "status" "WatchStatus" NOT NULL,
    "watch_count" INTEGER NOT NULL DEFAULT 0,
    "watched_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_episode_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_media_notes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "media_id" INTEGER,
    "season_id" INTEGER,
    "episode_id" INTEGER,
    "note" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_media_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_media_status_user_id_idx" ON "user_media_status"("user_id");

-- CreateIndex
CREATE INDEX "user_media_status_media_id_idx" ON "user_media_status"("media_id");

-- CreateIndex
CREATE INDEX "user_media_status_last_watched_episode_id_idx" ON "user_media_status"("last_watched_episode_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_media_status_user_id_media_id_key" ON "user_media_status"("user_id", "media_id");

-- CreateIndex
CREATE INDEX "user_season_status_user_id_idx" ON "user_season_status"("user_id");

-- CreateIndex
CREATE INDEX "user_season_status_season_id_idx" ON "user_season_status"("season_id");

-- CreateIndex
CREATE INDEX "user_season_status_last_watched_episode_id_idx" ON "user_season_status"("last_watched_episode_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_season_status_user_id_season_id_key" ON "user_season_status"("user_id", "season_id");

-- CreateIndex
CREATE INDEX "user_episode_status_user_id_idx" ON "user_episode_status"("user_id");

-- CreateIndex
CREATE INDEX "user_episode_status_episode_id_idx" ON "user_episode_status"("episode_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_episode_status_user_id_episode_id_key" ON "user_episode_status"("user_id", "episode_id");

-- CreateIndex
CREATE INDEX "user_media_notes_user_id_idx" ON "user_media_notes"("user_id");

-- CreateIndex
CREATE INDEX "user_media_notes_media_id_idx" ON "user_media_notes"("media_id");

-- CreateIndex
CREATE INDEX "user_media_notes_season_id_idx" ON "user_media_notes"("season_id");

-- CreateIndex
CREATE INDEX "user_media_notes_episode_id_idx" ON "user_media_notes"("episode_id");

-- AddForeignKey
ALTER TABLE "user_media_status" ADD CONSTRAINT "user_media_status_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_media_status" ADD CONSTRAINT "user_media_status_last_watched_episode_id_fkey" FOREIGN KEY ("last_watched_episode_id") REFERENCES "episodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_season_status" ADD CONSTRAINT "user_season_status_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_season_status" ADD CONSTRAINT "user_season_status_last_watched_episode_id_fkey" FOREIGN KEY ("last_watched_episode_id") REFERENCES "episodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_episode_status" ADD CONSTRAINT "user_episode_status_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_media_notes" ADD CONSTRAINT "user_media_notes_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_media_notes" ADD CONSTRAINT "user_media_notes_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_media_notes" ADD CONSTRAINT "user_media_notes_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
