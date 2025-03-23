const z = require('zod');

const parseTimestamp = (value) =>
  value instanceof Date ? value : new Date(value);

const EncounterSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  initiativeCounter: z.number().nonnegative().default(0),
  initativeOrder: z
    .array(
      z.object({
        id: z.string(),
        initiative: z.number().optional(),
      })
    )
    .default([]),
  createdAt: z.preprocess(parseTimestamp, z.date()).optional(),
  updatedAt: z.preprocess(parseTimestamp, z.date()).optional(),
  mapId: z.string().optional(),
  challengeRating: z.string().default("Easy"),
});

const validateEncounter = (data) => {
  return EncounterSchema.parse(data);
};

module.exports = { validateEncounter };
