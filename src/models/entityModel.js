const z = require('zod');

const parseTimestamp = (value) =>
    value instanceof Date ? value : new Date(value);

const EntitySchema = z.object({
    id: z.string(),
    // encounterId: z.string(),
    name: z.string().min(2),
    // type: z.enum(['PC', 'NPC', 'Monster']),
    // hp: z.number().nonnegative().default(0),
    // maxHp: z.number().nonnegative().default(0),
    // ac: z.number().nonnegative().default(10),
    // initiative: z.number().default(0),
    // statusEffects: z.array(z.string()).default([]),
    // createdAt: z.preprocess(parseTimestamp, z.date()).optional(),
    // updatedAt: z.preprocess(parseTimestamp, z.date()).optional(),
    x: z.number().default(0),
    y: z.number().default(0),
    image: z.string().optional(),
});

const validateEntity = (data) => {
    return EntitySchema.parse(data);
}

module.exports = { validateEntity };