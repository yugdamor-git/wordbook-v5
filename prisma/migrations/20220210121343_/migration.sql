-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "word" TEXT NOT NULL,
    "views" BIGINT NOT NULL DEFAULT 0,
    "likes" BIGINT NOT NULL DEFAULT 0,
    "origin" TEXT,
    "phonetic" TEXT,
    "audio_url" TEXT,
    "part_of_speech" TEXT
);
INSERT INTO "new_Word" ("audio_url", "createdAt", "id", "origin", "part_of_speech", "phonetic", "word") SELECT "audio_url", "createdAt", "id", "origin", "part_of_speech", "phonetic", "word" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
