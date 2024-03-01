const bcrypt = require('bcryptjs');

const hashPassword = async function (plainTextPassword) {
    return await bcrypt.hash(plainTextPassword, 10);
}

const passwordCheck = async function (plainTextPassword , hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword );
}

module.exports = {hashPassword, passwordCheck};