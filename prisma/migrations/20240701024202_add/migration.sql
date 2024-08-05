-- DropIndex
DROP INDEX "cast_media_id_person_id_credit_id_key";

-- DropIndex
DROP INDEX "crew_media_id_person_id_credit_id_key";

-- DropIndex
DROP INDEX "genres_id_name_key";

-- DropIndex
DROP INDEX "item_created_by_media_id_person_id_key";

-- DropIndex
DROP INDEX "item_genres_media_id_genre_id_key";

-- DropIndex
DROP INDEX "item_keywords_media_id_keyword_id_key";

-- DropIndex
DROP INDEX "item_networks_media_id_network_id_key";

-- DropIndex
DROP INDEX "item_production_companies_media_id_production_company_id_key";

-- DropIndex
DROP INDEX "item_production_countries_media_id_production_country_iso_key";

-- DropIndex
DROP INDEX "item_spoken_languages_media_id_spoken_language_iso_key";

-- DropIndex
DROP INDEX "origin_country_id_idx";

-- DropIndex
DROP INDEX "production_companies_id_name_key";

-- DropIndex
DROP INDEX "production_countries_iso_3166_1_name_key";

-- DropIndex
DROP INDEX "spoken_languages_iso_639_1_english_name_key";

-- CreateIndex
CREATE INDEX "cast_person_id_idx" ON "cast"("person_id");

-- CreateIndex
CREATE INDEX "crew_person_id_idx" ON "crew"("person_id");

-- CreateIndex
CREATE INDEX "episodes_media_id_idx" ON "episodes"("media_id");

-- CreateIndex
CREATE INDEX "images_type_idx" ON "images"("type");

-- CreateIndex
CREATE INDEX "item_created_by_person_id_idx" ON "item_created_by"("person_id");

-- CreateIndex
CREATE INDEX "item_genres_genre_id_idx" ON "item_genres"("genre_id");

-- CreateIndex
CREATE INDEX "item_keywords_keyword_id_idx" ON "item_keywords"("keyword_id");

-- CreateIndex
CREATE INDEX "item_networks_network_id_idx" ON "item_networks"("network_id");

-- CreateIndex
CREATE INDEX "item_production_companies_production_company_id_idx" ON "item_production_companies"("production_company_id");

-- CreateIndex
CREATE INDEX "item_production_countries_production_country_iso_idx" ON "item_production_countries"("production_country_iso");

-- CreateIndex
CREATE INDEX "item_spoken_languages_spoken_language_iso_idx" ON "item_spoken_languages"("spoken_language_iso");

-- CreateIndex
CREATE INDEX "item_watch_providers_watch_provider_id_idx" ON "item_watch_providers"("watch_provider_id");

-- CreateIndex
CREATE INDEX "item_watch_providers_country_code_idx" ON "item_watch_providers"("country_code");

-- CreateIndex
CREATE INDEX "item_watch_providers_service_type_idx" ON "item_watch_providers"("service_type");

-- CreateIndex
CREATE INDEX "translations_iso_3166_1_idx" ON "translations"("iso_3166_1");
