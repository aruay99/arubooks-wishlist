/*
  Warnings:

  - You are about to drop the column `genreId` on the `BookGenre` table. All the data in the column will be lost.
  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Genre` table. All the data in the column will be lost.
  - Added the required column `genreName` to the `BookGenre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookGenre" DROP CONSTRAINT "BookGenre_genreId_fkey";

-- AlterTable
ALTER TABLE "BookGenre" DROP COLUMN "genreId",
ADD COLUMN     "genreName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "BookGenre" ADD CONSTRAINT "BookGenre_genreName_fkey" FOREIGN KEY ("genreName") REFERENCES "Genre"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
