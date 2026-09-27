/*
  Warnings:

  - You are about to drop the column `portfolioId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioId` on the `WorkExperience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "portfolioId";

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "portfolioId";
