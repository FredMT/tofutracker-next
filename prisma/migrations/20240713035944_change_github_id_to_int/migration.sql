/*
  Warnings:

  - The `github_id` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "github_id",
ADD COLUMN     "github_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Account_github_id_key" ON "Account"("github_id");
