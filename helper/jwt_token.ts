const jwt = require('jsonwebtoken');

function generateAccessToken(username: String) {
    return jwt.sign(username, process.env.JWT_TOKEN);
}

export default generateAccessToken;