/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `Url` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "longUrl" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Url" ("createdAt", "id", "longUrl", "slug", "views") SELECT "createdAt", "id", "longUrl", "slug", "views" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url.slug_unique" ON "Url"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
