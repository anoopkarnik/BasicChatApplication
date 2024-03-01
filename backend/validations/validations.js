const zod = require('zod');

const signUpBody= zod.object({
    username: zod.string().email(),
    name: zod.string(),
    password: zod.string().min(6),
    confirmPassword: zod.string().min(6),
    gender: zod.string(),
});

const signInBody= zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
});

const updateBody = zod.object({
    name: zod.string(),
    password: zod.string().min(6),
    profilePic: zod.string(),
});


module.exports = {signInBody, signUpBody, updateBody};