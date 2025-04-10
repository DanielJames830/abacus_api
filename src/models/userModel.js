const z = require('zod');

const UserSchema = z.object({
    id: z.string(),
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

const validateUser = (data) => {
    return UserSchema.parse(data);
}

module.exports = { validateUser };