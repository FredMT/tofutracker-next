/*
  Warnings:

  - Changed the type of `air_date` on the `seasons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "seasons" DROP COLUMN "air_date",
ADD COLUMN     "air_date" TIMESTAMP(3) NOT NULL;
