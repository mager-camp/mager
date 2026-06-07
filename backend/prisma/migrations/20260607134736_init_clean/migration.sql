/*
  Warnings:

  - Changed the type of `name` on the `ActivityTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `endAt` to the `UserSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `UserSchedule` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `programType` on the `UserSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProgramType" AS ENUM ('TRAINING', 'COMPETITION', 'RECOVERY');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('ANGGAR', 'LARI', 'RENANG', 'TEMBAK', 'OBSTACLE');

-- AlterTable
ALTER TABLE "ActivityTemplate" DROP COLUMN "name",
ADD COLUMN     "name" "ActivityType" NOT NULL;

-- AlterTable
ALTER TABLE "UserSchedule" ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "programType",
ADD COLUMN     "programType" "ProgramType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ActivityTemplate_name_key" ON "ActivityTemplate"("name");
