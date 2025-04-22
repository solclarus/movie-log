/*
  Warnings:

  - You are about to drop the column `movieId` on the `record` table. All the data in the column will be lost.
  - You are about to drop the `_MovieGenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tmdbMovieId` to the `record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MovieGenres" DROP CONSTRAINT "_MovieGenres_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieGenres" DROP CONSTRAINT "_MovieGenres_B_fkey";

-- DropForeignKey
ALTER TABLE "record" DROP CONSTRAINT "record_movieId_fkey";

-- DropIndex
DROP INDEX "record_movieId_idx";

-- AlterTable
ALTER TABLE "record" DROP COLUMN "movieId",
ADD COLUMN     "tmdbMovieId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_MovieGenres";

-- DropTable
DROP TABLE "genre";

-- DropTable
DROP TABLE "movie";

-- CreateIndex
CREATE INDEX "record_tmdbMovieId_idx" ON "record"("tmdbMovieId");
