/*
  Warnings:

  - You are about to drop the `watchlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "watchlog" DROP CONSTRAINT "watchlog_movieId_fkey";

-- DropForeignKey
ALTER TABLE "watchlog" DROP CONSTRAINT "watchlog_userId_fkey";

-- DropTable
DROP TABLE "watchlog";

-- CreateTable
CREATE TABLE "record" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "watchDate" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER,
    "review" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "venue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "record_userId_idx" ON "record"("userId");

-- CreateIndex
CREATE INDEX "record_movieId_idx" ON "record"("movieId");

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record" ADD CONSTRAINT "record_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
