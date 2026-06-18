-- CreateTable
CREATE TABLE "UserReadiness" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserReadiness_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserReadiness_userId_calculatedAt_idx" ON "UserReadiness"("userId", "calculatedAt");

-- AddForeignKey
ALTER TABLE "UserReadiness" ADD CONSTRAINT "UserReadiness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
