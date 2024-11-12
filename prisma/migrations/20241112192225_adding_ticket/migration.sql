/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Payout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_transactionId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "transactionId",
DROP COLUMN "type",
ALTER COLUMN "qrCode" DROP NOT NULL;

-- DropTable
DROP TABLE "Payout";

-- DropTable
DROP TABLE "Transaction";
