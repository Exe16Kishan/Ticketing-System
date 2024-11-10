-- CreateTable
CREATE TABLE "Caste" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "performName" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Caste_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Caste" ADD CONSTRAINT "Caste_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
