-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "activityId" TEXT;

-- CreateIndex
CREATE INDEX "Course_activityId_idx" ON "Course"("activityId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ActivityTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
