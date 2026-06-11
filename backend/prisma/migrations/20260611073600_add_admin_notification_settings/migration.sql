-- CreateTable
CREATE TABLE IF NOT EXISTS "AdminSetting" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "notifEmail" BOOLEAN NOT NULL DEFAULT true,
    "notifSystem" BOOLEAN NOT NULL DEFAULT true,
    "notifReport" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "AdminSetting_adminId_key" ON "AdminSetting"("adminId");

-- AddForeignKey
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'AdminSetting_adminId_fkey'
  ) THEN
    ALTER TABLE "AdminSetting"
    ADD CONSTRAINT "AdminSetting_adminId_fkey"
    FOREIGN KEY ("adminId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;