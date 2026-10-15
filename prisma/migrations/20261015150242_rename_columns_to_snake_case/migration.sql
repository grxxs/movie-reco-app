/*
  Warnings:

  - You are about to drop the column `productionId` on the `list_items` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `list_items` table. All the data in the column will be lost.
  - The primary key for the `production_genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genreId` on the `production_genres` table. All the data in the column will be lost.
  - You are about to drop the column `productionId` on the `production_genres` table. All the data in the column will be lost.
  - The primary key for the `production_keywords` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `keywordId` on the `production_keywords` table. All the data in the column will be lost.
  - You are about to drop the column `productionId` on the `production_keywords` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,production_id]` on the table `list_items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `production_id` to the `list_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `list_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre_id` to the `production_genres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `production_id` to the `production_genres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyword_id` to the `production_keywords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `production_id` to the `production_keywords` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "list_items" DROP CONSTRAINT "list_items_productionId_fkey";

-- DropForeignKey
ALTER TABLE "list_items" DROP CONSTRAINT "list_items_userId_fkey";

-- DropForeignKey
ALTER TABLE "production_genres" DROP CONSTRAINT "production_genres_genreId_fkey";

-- DropForeignKey
ALTER TABLE "production_genres" DROP CONSTRAINT "production_genres_productionId_fkey";

-- DropForeignKey
ALTER TABLE "production_keywords" DROP CONSTRAINT "production_keywords_keywordId_fkey";

-- DropForeignKey
ALTER TABLE "production_keywords" DROP CONSTRAINT "production_keywords_productionId_fkey";

-- DropIndex
DROP INDEX "list_items_userId_productionId_key";

-- AlterTable
ALTER TABLE "list_items" DROP COLUMN "productionId",
DROP COLUMN "userId",
ADD COLUMN     "production_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "production_genres" DROP CONSTRAINT "production_genres_pkey",
DROP COLUMN "genreId",
DROP COLUMN "productionId",
ADD COLUMN     "genre_id" INTEGER NOT NULL,
ADD COLUMN     "production_id" UUID NOT NULL,
ADD CONSTRAINT "production_genres_pkey" PRIMARY KEY ("production_id", "genre_id");

-- AlterTable
ALTER TABLE "production_keywords" DROP CONSTRAINT "production_keywords_pkey",
DROP COLUMN "keywordId",
DROP COLUMN "productionId",
ADD COLUMN     "keyword_id" INTEGER NOT NULL,
ADD COLUMN     "production_id" UUID NOT NULL,
ADD CONSTRAINT "production_keywords_pkey" PRIMARY KEY ("production_id", "keyword_id");

-- CreateIndex
CREATE UNIQUE INDEX "list_items_user_id_production_id_key" ON "list_items"("user_id", "production_id");

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "productions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_keywords" ADD CONSTRAINT "production_keywords_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_keywords" ADD CONSTRAINT "production_keywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_genres" ADD CONSTRAINT "production_genres_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_genres" ADD CONSTRAINT "production_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
