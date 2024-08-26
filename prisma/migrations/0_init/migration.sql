-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateEnum
CREATE TYPE "public"."ImageType" AS ENUM ('BACKDROP', 'LOGO', 'POSTER', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "public"."MediaType" AS ENUM ('MOVIE', 'TV');

-- CreateEnum
CREATE TYPE "users"."AccountType" AS ENUM ('email', 'google', 'github');

-- CreateEnum
CREATE TYPE "users"."WatchStatus" AS ENUM ('PLANNING', 'WATCHING', 'COMPLETED', 'DROPPED', 'REWATCHING', 'ONHOLD');

-- CreateEnum
CREATE TYPE "users"."WatchMediaType" AS ENUM ('movie', 'show', 'season', 'episode');

-- CreateTable
CREATE TABLE "users"."Account" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "account_type" "users"."AccountType" NOT NULL,
    "github_id" INTEGER,
    "google_id" TEXT,
    "password" TEXT,
    "salt" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."MagicLink" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT,
    "token_expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MagicLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."Profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "username" TEXT,
    "image_id" TEXT,
    "image" TEXT,
    "bio" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."ResetToken" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT,
    "token_expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."Session" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."VerifyEmailToken" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT,
    "token_expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerifyEmailToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."UserMedia" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "last_watched_episode_id" INTEGER,
    "watch_status" "users"."WatchStatus" NOT NULL,
    "rating" REAL,
    "previous_watch_status" "users"."WatchStatus",
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."UserSeason" (
    "id" SERIAL NOT NULL,
    "user_media_id" INTEGER NOT NULL,
    "season_id" INTEGER NOT NULL,
    "last_watched_episode_id" INTEGER,
    "watch_status" "users"."WatchStatus",
    "rating" REAL,

    CONSTRAINT "UserSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."UserEpisode" (
    "id" SERIAL NOT NULL,
    "user_media_id" INTEGER NOT NULL,
    "episode_id" INTEGER NOT NULL,
    "rating" REAL,

    CONSTRAINT "UserEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."WatchHistory" (
    "id" SERIAL NOT NULL,
    "user_media_id" INTEGER NOT NULL,
    "episode_id" INTEGER,
    "season_id" INTEGER,
    "watched_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "media_type" "users"."WatchMediaType" NOT NULL,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."CheckIn" (
    "id" SERIAL NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "media_id" INTEGER NOT NULL,
    "previous_watch_status" TEXT,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "media_type" "public"."MediaType" NOT NULL,
    "user_media_id" INTEGER NOT NULL,

    CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."UserMediaLike" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_media_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMediaLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,
    "user_media_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."CommentLike" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_key" ON "users"."Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_github_id_key" ON "users"."Account"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_google_id_key" ON "users"."Account"("google_id");

-- CreateIndex
CREATE INDEX "Account_user_id_idx" ON "users"."Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "MagicLink_email_key" ON "users"."MagicLink"("email");

-- CreateIndex
CREATE INDEX "MagicLink_email_idx" ON "users"."MagicLink"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "users"."Profile"("user_id");

-- CreateIndex
CREATE INDEX "Profile_user_id_idx" ON "users"."Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_user_id_key" ON "users"."ResetToken"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "users"."user"("email");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "users"."user"("email");

-- CreateIndex
CREATE INDEX "user_id_idx" ON "users"."user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VerifyEmailToken_user_id_key" ON "users"."VerifyEmailToken"("user_id");

-- CreateIndex
CREATE INDEX "UserMedia_user_id_idx" ON "users"."UserMedia"("user_id");

-- CreateIndex
CREATE INDEX "UserMedia_media_id_idx" ON "users"."UserMedia"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMedia_user_id_media_id_key" ON "users"."UserMedia"("user_id", "media_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeason_user_media_id_season_id_key" ON "users"."UserSeason"("user_media_id", "season_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEpisode_user_media_id_episode_id_key" ON "users"."UserEpisode"("user_media_id", "episode_id");

-- CreateIndex
CREATE INDEX "WatchHistory_user_media_id_idx" ON "users"."WatchHistory"("user_media_id");

-- CreateIndex
CREATE INDEX "WatchHistory_episode_id_idx" ON "users"."WatchHistory"("episode_id");

-- CreateIndex
CREATE INDEX "WatchHistory_season_id_idx" ON "users"."WatchHistory"("season_id");

-- CreateIndex
CREATE INDEX "WatchHistory_watched_at_idx" ON "users"."WatchHistory"("watched_at");

-- CreateIndex
CREATE INDEX "CheckIn_end_time_idx" ON "users"."CheckIn"("end_time");

-- CreateIndex
CREATE INDEX "CheckIn_media_id_idx" ON "users"."CheckIn"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_user_id_media_id_key" ON "users"."CheckIn"("user_id", "media_id");

-- CreateIndex
CREATE INDEX "UserMediaLike_user_id_idx" ON "users"."UserMediaLike"("user_id");

-- CreateIndex
CREATE INDEX "UserMediaLike_user_media_id_idx" ON "users"."UserMediaLike"("user_media_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMediaLike_user_id_user_media_id_key" ON "users"."UserMediaLike"("user_id", "user_media_id");

-- CreateIndex
CREATE INDEX "Comment_parent_id_idx" ON "users"."Comment"("parent_id");

-- CreateIndex
CREATE INDEX "Comment_user_id_idx" ON "users"."Comment"("user_id");

-- CreateIndex
CREATE INDEX "Comment_user_media_id_idx" ON "users"."Comment"("user_media_id");

-- CreateIndex
CREATE INDEX "CommentLike_comment_id_idx" ON "users"."CommentLike"("comment_id");

-- CreateIndex
CREATE INDEX "CommentLike_user_id_idx" ON "users"."CommentLike"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_user_id_comment_id_key" ON "users"."CommentLike"("user_id", "comment_id");

-- AddForeignKey
ALTER TABLE "users"."Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."ResetToken" ADD CONSTRAINT "ResetToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."VerifyEmailToken" ADD CONSTRAINT "VerifyEmailToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."UserMedia" ADD CONSTRAINT "UserMedia_user_id_fkey1" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."UserMedia" ADD CONSTRAINT "UserMedia_user_id_fkey2" FOREIGN KEY ("user_id") REFERENCES "users"."Profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."UserSeason" ADD CONSTRAINT "UserSeason_user_media_id_fkey" FOREIGN KEY ("user_media_id") REFERENCES "users"."UserMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."UserEpisode" ADD CONSTRAINT "UserEpisode_user_media_id_fkey" FOREIGN KEY ("user_media_id") REFERENCES "users"."UserMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."WatchHistory" ADD CONSTRAINT "WatchHistory_user_media_id_fkey" FOREIGN KEY ("user_media_id") REFERENCES "users"."UserMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."CheckIn" ADD CONSTRAINT "CheckIn_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."CheckIn" ADD CONSTRAINT "CheckIn_user_media_id_fkey" FOREIGN KEY ("user_media_id") REFERENCES "users"."UserMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."UserMediaLike" ADD CONSTRAINT "UserMediaLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."UserMediaLike" ADD CONSTRAINT "UserMediaLike_user_media_id_fkey" FOREIGN KEY ("user_media_id") REFERENCES "users"."UserMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Comment" ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "users"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Comment" ADD CONSTRAINT "Comment_user_media_id_fkey" FOREIGN KEY ("user_media_id") REFERENCES "users"."UserMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."CommentLike" ADD CONSTRAINT "CommentLike_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "users"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."CommentLike" ADD CONSTRAINT "CommentLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

