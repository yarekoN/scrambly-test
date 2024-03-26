/*
  Warnings:

  - You are about to drop the column `end` on the `slots` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `slots` table. All the data in the column will be lost.
  - Added the required column `check_in` to the `slots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_out` to the `slots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "slots" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "check_in" TEXT NOT NULL,
ADD COLUMN     "check_out" TEXT NOT NULL;

INSERT INTO "custom"."slots" ("id", "check_in", "check_out") VALUES (gen_random_uuid(), '12:00','13:00'), (gen_random_uuid(), '13:00','14:00'), (gen_random_uuid(), '14:00','15:00'), (gen_random_uuid(), '15:00','16:00'), (gen_random_uuid(), '16:00','17:00'), (gen_random_uuid(), '17:30','18:30');