-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "word" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "phonetic" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "part_of_speech" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WordLocalizations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "word" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "phonetic" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "part_of_speech" TEXT NOT NULL,
    "w_id" INTEGER NOT NULL,
    CONSTRAINT "WordLocalizations_w_id_fkey" FOREIGN KEY ("w_id") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Defination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "defination" TEXT NOT NULL,
    "w_id" INTEGER,
    CONSTRAINT "Defination_w_id_fkey" FOREIGN KEY ("w_id") REFERENCES "Word" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DefinationsLocalizations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "defination" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "d_id" INTEGER NOT NULL,
    CONSTRAINT "DefinationsLocalizations_d_id_fkey" FOREIGN KEY ("d_id") REFERENCES "Defination" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Example" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "example" TEXT NOT NULL,
    "d_id" INTEGER NOT NULL,
    CONSTRAINT "Example_d_id_fkey" FOREIGN KEY ("d_id") REFERENCES "Defination" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExampleLocalizations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "example" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "e_id" INTEGER NOT NULL,
    CONSTRAINT "ExampleLocalizations_e_id_fkey" FOREIGN KEY ("e_id") REFERENCES "Example" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Synonym" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "synonym" TEXT NOT NULL,
    "d_id" INTEGER NOT NULL,
    CONSTRAINT "Synonym_d_id_fkey" FOREIGN KEY ("d_id") REFERENCES "Defination" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SynonymLocalizations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "synonym" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "s_id" INTEGER NOT NULL,
    CONSTRAINT "SynonymLocalizations_s_id_fkey" FOREIGN KEY ("s_id") REFERENCES "Synonym" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Antonym" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "antonym" TEXT NOT NULL,
    "d_id" INTEGER NOT NULL,
    CONSTRAINT "Antonym_d_id_fkey" FOREIGN KEY ("d_id") REFERENCES "Defination" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AntonymLocalizations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "antonym" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "a_id" INTEGER NOT NULL,
    CONSTRAINT "AntonymLocalizations_a_id_fkey" FOREIGN KEY ("a_id") REFERENCES "Antonym" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
