/*
  Warnings:

  - You are about to drop the `temp_movie_ids` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "temp_movie_ids";

-- CreateTable
CREATE TABLE "temp_ids" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "temp_ids_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "temp_ids_id_key" ON "temp_ids"("id");

-- CreateIndex
CREATE INDEX "temp_ids_id_idx" ON "temp_ids"("id");
