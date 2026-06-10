/*
  Warnings:

  - You are about to drop the column `caloriesBurned` on the `WorkoutLog` table. All the data in the column will be lost.
  - You are about to drop the column `distanceKm` on the `WorkoutLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutLog" DROP COLUMN "caloriesBurned",
DROP COLUMN "distanceKm";
