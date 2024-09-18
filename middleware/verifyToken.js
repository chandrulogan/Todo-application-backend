const jwt = require('jsonwebtoken');
const key = "skdjjfnsnoanosasakkdnlsndlklvsfbeivdfkldueg"

// Generate a JWT token using email and id
function generateToken(email, id) {
    const payload = { email, id };
    return jwt.sign(payload, key, { expiresIn: 2 });
}

// Validate a JWT token using the secret key
function validateToken(token) {
    try {
        return jwt.verify(token, key);
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken, validateToken }