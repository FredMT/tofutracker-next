/*
  Warnings:

  - You are about to drop the column `origin_countries` on the `media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "origin_countries";

-- CreateTable
CREATE TABLE "origin_country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "media_id" INTEGER NOT NULL,

    CONSTRAINT "origin_country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "origin_country_id_key" ON "origin_country"("id");

-- CreateIndex
CREATE INDEX "origin_country_id_idx" ON "origin_country"("id");

-- CreateIndex
CREATE INDEX "origin_country_media_id_idx" ON "origin_country"("media_id");

-- AddForeignKey
ALTER TABLE "origin_country" ADD CONSTRAINT "origin_country_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
