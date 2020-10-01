const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SIGN_SECRET = process.env.JWT_SECRET;

module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: "10h",
      }
    );
  },

  parseAuthorization: (authorization) => {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },

  getUserId: (authorization, response) => {
    let userId = -1;
    const token = module.exports.parseAuthorization(authorization);
    if (token) {
      jwt.verify(token, JWT_SIGN_SECRET, (error, decoded) => {
        if (error) {
          throw new UnauthorizedError(
            "Unauthorized access",
            "Problem accessing the jwtToken "
          );
        }
        userId = decoded.userId;
      });
    } else {
      throw new UnauthorizedError(
        "Unauthorized access",
        "The token is invalid"
      );
    }
    return userId;
  },
};
