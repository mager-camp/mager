/*
  Warnings:

  - The values [regular] on the enum `CourseType` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `activityId` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseType_new" AS ENUM ('free', 'premium');
ALTER TABLE "Course" ALTER COLUMN "type" TYPE "CourseType_new" USING ("type"::text::"CourseType_new");
ALTER TYPE "CourseType" RENAME TO "CourseType_old";
ALTER TYPE "CourseType_new" RENAME TO "CourseType";
DROP TYPE "public"."CourseType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_activityId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "activityId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
