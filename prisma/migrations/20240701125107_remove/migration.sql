/*
  Warnings:

  - You are about to drop the column `season_id` on the `cast` table. All the data in the column will be lost.
  - You are about to drop the column `season_id` on the `crew` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cast" DROP CONSTRAINT "cast_season_id_fkey";

-- DropForeignKey
ALTER TABLE "crew" DROP CONSTRAINT "crew_season_id_fkey";

-- DropIndex
DROP INDEX "cast_season_id_idx";

-- DropIndex
DROP INDEX "crew_season_id_idx";

-- AlterTable
ALTER TABLE "cast" DROP COLUMN "season_id";

-- AlterTable
ALTER TABLE "crew" DROP COLUMN "season_id";
