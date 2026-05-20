/*
  Warnings:

  - You are about to drop the column `alarmTime` on the `UserSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `UserSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledTime` on the `UserSchedule` table. All the data in the column will be lost.
  - Added the required column `scheduledAt` to the `UserSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserSchedule_userId_scheduledDate_idx";

-- AlterTable
ALTER TABLE "UserSchedule" DROP COLUMN "alarmTime",
DROP COLUMN "scheduledDate",
DROP COLUMN "scheduledTime",
ADD COLUMN     "alarmAt" TIMESTAMP(3),
ADD COLUMN     "reminderSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "UserSchedule_userId_scheduledAt_idx" ON "UserSchedule"("userId", "scheduledAt");

-- CreateIndex
CREATE INDEX "UserSchedule_alarmAt_idx" ON "UserSchedule"("alarmAt");
