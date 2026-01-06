/*
  Warnings:

  - You are about to drop the column `languagesDescription` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `skillsDescription` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `strengthsDescription` on the `resumes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resumes" DROP COLUMN "languagesDescription",
DROP COLUMN "skillsDescription",
DROP COLUMN "strengthsDescription",
ALTER COLUMN "skills" DROP NOT NULL,
ALTER COLUMN "skills" SET DATA TYPE TEXT,
ALTER COLUMN "strengths" DROP NOT NULL,
ALTER COLUMN "strengths" SET DATA TYPE TEXT,
ALTER COLUMN "languages" DROP NOT NULL,
ALTER COLUMN "languages" SET DATA TYPE TEXT;
