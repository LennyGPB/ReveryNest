/*
  Warnings:

  - You are about to drop the column `mood` on the `Dream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dream" DROP COLUMN "mood",
ADD COLUMN     "moods" TEXT[],
ALTER COLUMN "intensity" DROP NOT NULL;
