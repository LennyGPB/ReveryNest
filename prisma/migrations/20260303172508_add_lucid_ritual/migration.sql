-- CreateTable
CREATE TABLE "LucidRitual" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ritual" JSONB NOT NULL,
    "signals" JSONB NOT NULL,
    "lastDreamAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LucidRitual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LucidRitual_userId_key" ON "LucidRitual"("userId");

-- AddForeignKey
ALTER TABLE "LucidRitual" ADD CONSTRAINT "LucidRitual_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
