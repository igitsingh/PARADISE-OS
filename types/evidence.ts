import { z } from 'zod';
import { VerificationStatus } from '@prisma/client';

export const SourceTierEnum = z.union([
  z.literal(1), // Official Primary
  z.literal(2), // Official Secondary
  z.literal(3), // Intermediary
  z.literal(4)  // Sentiment/Public
]);

export const VerificationStatusEnum = z.nativeEnum(VerificationStatus);

export const EvidenceSchema = z.object({
  id: z.string().uuid().optional(),
  entityType: z.string().min(1),
  entityId: z.string().uuid(),
  fieldName: z.string().min(1),
  
  value: z.string(),
  valueType: z.enum(['string', 'number', 'boolean', 'json']),
  
  sourceName: z.string().min(1, "Source name is required"),
  sourceUrl: z.string().url().optional(),
  sourceTier: SourceTierEnum,
  
  dateCollected: z.date().default(() => new Date()),
  lastVerified: z.date().default(() => new Date()),
  
  verificationStatus: VerificationStatusEnum.default(VerificationStatus.VERIFICATION_PENDING),
  confidenceScore: z.number().min(0).max(100),
  
  version: z.number().int().min(1).default(1),
  isCurrent: z.boolean().default(true),
  previousVersionId: z.string().uuid().optional().nullable(),
});

export type Evidence = z.infer<typeof EvidenceSchema>;

// Strict schema for enforcing the 0% Fabricated Data policy on incoming data
export const StrictEvidenceCreateSchema = EvidenceSchema.omit({
  id: true,
  version: true,
  isCurrent: true
}).refine(data => {
  // If verification is VERIFIED, confidence score must be logically high
  if (data.verificationStatus === VerificationStatus.VERIFIED && data.confidenceScore < 85) {
    return false;
  }
  return true;
}, {
  message: "Verified data must have a confidence score of 85 or higher.",
  path: ["confidenceScore"]
});
