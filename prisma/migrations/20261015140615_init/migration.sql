-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('PLANNED', 'WATCHED', 'WATCHING');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'TV');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tmdb_id" INTEGER NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "title" TEXT NOT NULL,
    "release_date" TIMESTAMP(3),
    "overview" TEXT,
    "poster_path" TEXT,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "productionId" UUID NOT NULL,
    "status" "WatchStatus" NOT NULL DEFAULT 'PLANNED',
    "rating" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "list_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_keywords" (
    "productionId" UUID NOT NULL,
    "keywordId" INTEGER NOT NULL,

    CONSTRAINT "production_keywords_pkey" PRIMARY KEY ("productionId","keywordId")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_genres" (
    "productionId" UUID NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "production_genres_pkey" PRIMARY KEY ("productionId","genreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "productions_tmdb_id_media_type_key" ON "productions"("tmdb_id", "media_type");

-- CreateIndex
CREATE UNIQUE INDEX "list_items_userId_productionId_key" ON "list_items"("userId", "productionId");

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "productions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_keywords" ADD CONSTRAINT "production_keywords_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_keywords" ADD CONSTRAINT "production_keywords_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_genres" ADD CONSTRAINT "production_genres_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_genres" ADD CONSTRAINT "production_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
