/*
  Warnings:

  - You are about to drop the column `activLucid` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activLucid",
ADD COLUMN     "activeLucid" BOOLEAN NOT NULL DEFAULT false;
