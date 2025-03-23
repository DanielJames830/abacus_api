const z = require('zod');

const parseTimestamp = (value) =>
    value instanceof Date ? value : new Date(value);

const MapSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    description: z.string().min(2),
    createdAt: z.preprocess(parseTimestamp, z.date()).optional(),
    updatedAt: z.preprocess(parseTimestamp, z.date()).optional(),
    width: z.number().nonnegative().default(0),
    height: z.number().nonnegative().default(0),
    tileSize: z.number().nonnegative().default(0),
    grid: z.boolean().default(false),
    gridColor: z.string().default('#000000'),
    backgroundImage: z.string().optional(),
    backgroundColor: z.string().optional(),
});

const validateMap = (data) => { 
    return MapSchema.parse(data);
};

module.exports = { validateMap };