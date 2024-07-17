-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('BACKDROP', 'LOGO', 'POSTER');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'TV');

-- CreateTable
CREATE TABLE "media" (
    "id" INTEGER NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "adult" BOOLEAN,
    "backdrop_path" TEXT,
    "budget" BIGINT,
    "homepage" TEXT,
    "imdb_id" TEXT,
    "original_language" TEXT,
    "original_title" TEXT,
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "poster_path" TEXT,
    "release_date" TIMESTAMP(3),
    "revenue" BIGINT,
    "runtime" INTEGER,
    "status" TEXT,
    "tagline" TEXT,
    "title" TEXT NOT NULL,
    "video" BOOLEAN,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,
    "first_air_date" TIMESTAMP(3),
    "in_production" BOOLEAN,
    "last_air_date" TIMESTAMP(3),
    "number_of_episodes" INTEGER,
    "number_of_seasons" INTEGER,
    "type" TEXT,
    "origin_countries" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cast" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,
    "character" TEXT NOT NULL,
    "credit_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "cast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_ratings" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "iso_3166_1" TEXT NOT NULL,
    "content_rating" TEXT NOT NULL,

    CONSTRAINT "content_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crew" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,
    "credit_id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "job" TEXT NOT NULL,

    CONSTRAINT "crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER,
    "season_id" INTEGER NOT NULL,
    "air_date" TIMESTAMP(3) NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "still_path" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_ids" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "imdb_id" TEXT,
    "freebase_id" TEXT,
    "freebase_mid" TEXT,
    "tvdb_id" INTEGER,
    "tvrage_id" INTEGER,
    "wikidata_id" TEXT,
    "facebook_id" TEXT,
    "instagram_id" TEXT,
    "twitter_id" TEXT,

    CONSTRAINT "external_ids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "type" "ImageType" NOT NULL,
    "file_path" TEXT NOT NULL,
    "aspect_ratio" DOUBLE PRECISION,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "iso_639_1" TEXT,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_created_by" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,
    "credit_id" TEXT NOT NULL,

    CONSTRAINT "item_created_by_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_genres" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "item_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_keywords" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "keyword_id" INTEGER NOT NULL,

    CONSTRAINT "item_keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_networks" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "network_id" INTEGER NOT NULL,

    CONSTRAINT "item_networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_production_companies" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "production_company_id" INTEGER NOT NULL,

    CONSTRAINT "item_production_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_production_countries" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "production_country_iso" TEXT NOT NULL,

    CONSTRAINT "item_production_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_spoken_languages" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "spoken_language_iso" TEXT NOT NULL,

    CONSTRAINT "item_spoken_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_watch_providers" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "watch_provider_id" INTEGER NOT NULL,
    "country_code" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "service_type" TEXT NOT NULL,

    CONSTRAINT "item_watch_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "networks" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo_path" TEXT NOT NULL,
    "origin_country" TEXT NOT NULL,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "adult" BOOLEAN,
    "gender" INTEGER,
    "known_for_department" TEXT,
    "original_name" TEXT,
    "popularity" DOUBLE PRECISION,
    "profile_path" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_companies" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo_path" TEXT,
    "origin_country" TEXT,

    CONSTRAINT "production_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_countries" (
    "iso_3166_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "production_countries_pkey" PRIMARY KEY ("iso_3166_1")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "season_number" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "episode_count" INTEGER NOT NULL,
    "air_date" TEXT NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spoken_languages" (
    "english_name" TEXT NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "spoken_languages_pkey" PRIMARY KEY ("iso_639_1")
);

-- CreateTable
CREATE TABLE "temp_movie_ids" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "temp_movie_ids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translations" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "iso_3166_1" TEXT NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "english_name" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "media_id" INTEGER NOT NULL,
    "iso_3166_1" TEXT NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "official" BOOLEAN NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "video_id" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watch_providers" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo_path" TEXT NOT NULL,

    CONSTRAINT "watch_providers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_id_key" ON "media"("id");

-- CreateIndex
CREATE INDEX "media_id_idx" ON "media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cast_id_key" ON "cast"("id");

-- CreateIndex
CREATE INDEX "cast_media_id_idx" ON "cast"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "cast_media_id_person_id_credit_id_key" ON "cast"("media_id", "person_id", "credit_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_ratings_id_key" ON "content_ratings"("id");

-- CreateIndex
CREATE INDEX "content_ratings_media_id_idx" ON "content_ratings"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_ratings_media_id_iso_3166_1_key" ON "content_ratings"("media_id", "iso_3166_1");

-- CreateIndex
CREATE UNIQUE INDEX "crew_id_key" ON "crew"("id");

-- CreateIndex
CREATE INDEX "crew_media_id_idx" ON "crew"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "crew_media_id_person_id_credit_id_key" ON "crew"("media_id", "person_id", "credit_id");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_id_key" ON "episodes"("id");

-- CreateIndex
CREATE INDEX "episodes_season_id_idx" ON "episodes"("season_id");

-- CreateIndex
CREATE UNIQUE INDEX "external_ids_id_key" ON "external_ids"("id");

-- CreateIndex
CREATE UNIQUE INDEX "external_ids_media_id_key" ON "external_ids"("media_id");

-- CreateIndex
CREATE INDEX "external_ids_media_id_idx" ON "external_ids"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "genres_id_key" ON "genres"("id");

-- CreateIndex
CREATE INDEX "genres_id_idx" ON "genres"("id");

-- CreateIndex
CREATE UNIQUE INDEX "genres_id_name_key" ON "genres"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE INDEX "images_media_id_idx" ON "images"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_created_by_id_key" ON "item_created_by"("id");

-- CreateIndex
CREATE INDEX "item_created_by_media_id_idx" ON "item_created_by"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_created_by_media_id_person_id_key" ON "item_created_by"("media_id", "person_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_genres_id_key" ON "item_genres"("id");

-- CreateIndex
CREATE INDEX "item_genres_media_id_idx" ON "item_genres"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_genres_media_id_genre_id_key" ON "item_genres"("media_id", "genre_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_keywords_id_key" ON "item_keywords"("id");

-- CreateIndex
CREATE INDEX "item_keywords_media_id_idx" ON "item_keywords"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_keywords_media_id_keyword_id_key" ON "item_keywords"("media_id", "keyword_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_networks_id_key" ON "item_networks"("id");

-- CreateIndex
CREATE INDEX "item_networks_media_id_idx" ON "item_networks"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_networks_media_id_network_id_key" ON "item_networks"("media_id", "network_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_production_companies_id_key" ON "item_production_companies"("id");

-- CreateIndex
CREATE INDEX "item_production_companies_media_id_idx" ON "item_production_companies"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_production_companies_media_id_production_company_id_key" ON "item_production_companies"("media_id", "production_company_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_production_countries_id_key" ON "item_production_countries"("id");

-- CreateIndex
CREATE INDEX "item_production_countries_media_id_idx" ON "item_production_countries"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_production_countries_media_id_production_country_iso_key" ON "item_production_countries"("media_id", "production_country_iso");

-- CreateIndex
CREATE UNIQUE INDEX "item_spoken_languages_id_key" ON "item_spoken_languages"("id");

-- CreateIndex
CREATE INDEX "item_spoken_languages_media_id_idx" ON "item_spoken_languages"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_spoken_languages_media_id_spoken_language_iso_key" ON "item_spoken_languages"("media_id", "spoken_language_iso");

-- CreateIndex
CREATE UNIQUE INDEX "item_watch_providers_id_key" ON "item_watch_providers"("id");

-- CreateIndex
CREATE INDEX "item_watch_providers_media_id_idx" ON "item_watch_providers"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_watch_providers_media_id_watch_provider_id_country_cod_key" ON "item_watch_providers"("media_id", "watch_provider_id", "country_code");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_id_key" ON "keywords"("id");

-- CreateIndex
CREATE INDEX "keywords_id_idx" ON "keywords"("id");

-- CreateIndex
CREATE UNIQUE INDEX "networks_id_key" ON "networks"("id");

-- CreateIndex
CREATE INDEX "networks_id_idx" ON "networks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "persons_id_key" ON "persons"("id");

-- CreateIndex
CREATE INDEX "persons_id_idx" ON "persons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "production_companies_id_key" ON "production_companies"("id");

-- CreateIndex
CREATE INDEX "production_companies_id_idx" ON "production_companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "production_companies_id_name_key" ON "production_companies"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "production_countries_iso_3166_1_key" ON "production_countries"("iso_3166_1");

-- CreateIndex
CREATE INDEX "production_countries_iso_3166_1_idx" ON "production_countries"("iso_3166_1");

-- CreateIndex
CREATE UNIQUE INDEX "production_countries_iso_3166_1_name_key" ON "production_countries"("iso_3166_1", "name");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_id_key" ON "seasons"("id");

-- CreateIndex
CREATE INDEX "seasons_media_id_idx" ON "seasons"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "spoken_languages_iso_639_1_key" ON "spoken_languages"("iso_639_1");

-- CreateIndex
CREATE INDEX "spoken_languages_iso_639_1_idx" ON "spoken_languages"("iso_639_1");

-- CreateIndex
CREATE UNIQUE INDEX "spoken_languages_iso_639_1_english_name_key" ON "spoken_languages"("iso_639_1", "english_name");

-- CreateIndex
CREATE UNIQUE INDEX "temp_movie_ids_id_key" ON "temp_movie_ids"("id");

-- CreateIndex
CREATE INDEX "temp_movie_ids_id_idx" ON "temp_movie_ids"("id");

-- CreateIndex
CREATE UNIQUE INDEX "translations_id_key" ON "translations"("id");

-- CreateIndex
CREATE INDEX "translations_media_id_idx" ON "translations"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "videos_id_key" ON "videos"("id");

-- CreateIndex
CREATE INDEX "videos_media_id_idx" ON "videos"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "watch_providers_id_key" ON "watch_providers"("id");

-- CreateIndex
CREATE INDEX "watch_providers_id_idx" ON "watch_providers"("id");

-- AddForeignKey
ALTER TABLE "cast" ADD CONSTRAINT "cast_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cast" ADD CONSTRAINT "cast_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_ratings" ADD CONSTRAINT "content_ratings_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew" ADD CONSTRAINT "crew_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew" ADD CONSTRAINT "crew_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_ids" ADD CONSTRAINT "external_ids_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_created_by" ADD CONSTRAINT "item_created_by_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_created_by" ADD CONSTRAINT "item_created_by_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_genres" ADD CONSTRAINT "item_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_genres" ADD CONSTRAINT "item_genres_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_keywords" ADD CONSTRAINT "item_keywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "keywords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_keywords" ADD CONSTRAINT "item_keywords_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_networks" ADD CONSTRAINT "item_networks_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_networks" ADD CONSTRAINT "item_networks_network_id_fkey" FOREIGN KEY ("network_id") REFERENCES "networks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_production_companies" ADD CONSTRAINT "item_production_companies_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_production_companies" ADD CONSTRAINT "item_production_companies_production_company_id_fkey" FOREIGN KEY ("production_company_id") REFERENCES "production_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_production_countries" ADD CONSTRAINT "item_production_countries_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_production_countries" ADD CONSTRAINT "item_production_countries_production_country_iso_fkey" FOREIGN KEY ("production_country_iso") REFERENCES "production_countries"("iso_3166_1") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_spoken_languages" ADD CONSTRAINT "item_spoken_languages_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_spoken_languages" ADD CONSTRAINT "item_spoken_languages_spoken_language_iso_fkey" FOREIGN KEY ("spoken_language_iso") REFERENCES "spoken_languages"("iso_639_1") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_watch_providers" ADD CONSTRAINT "item_watch_providers_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_watch_providers" ADD CONSTRAINT "item_watch_providers_watch_provider_id_fkey" FOREIGN KEY ("watch_provider_id") REFERENCES "watch_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translations" ADD CONSTRAINT "translations_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
