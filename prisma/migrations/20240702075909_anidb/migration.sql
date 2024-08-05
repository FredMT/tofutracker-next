-- CreateTable
CREATE TABLE "anidb_mapping" (
    "anidb_id" BIGINT NOT NULL,
    "tvdb_id" BIGINT,
    "tmdb_id" BIGINT,
    "notifymoe_id" TEXT,
    "mal_id" BIGINT,
    "imdb_id" TEXT,
    "anilist_id" BIGINT,
    "livechart_id" BIGINT,

    CONSTRAINT "anidb_mapping_pkey" PRIMARY KEY ("anidb_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anidb_mapping_anidb_id_key" ON "anidb_mapping"("anidb_id");

-- CreateIndex
CREATE INDEX "anidb_mapping_anidb_id_idx" ON "anidb_mapping"("anidb_id");

-- CreateIndex
CREATE INDEX "anidb_mapping_tmdb_id_idx" ON "anidb_mapping"("tmdb_id");

-- CreateIndex
CREATE INDEX "anidb_mapping_tvdb_id_idx" ON "anidb_mapping"("tvdb_id");
