const jwt = require("jsonwebtoken");
const SECRET_KEY = "some_key";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log("authenticateToken", authHeader);
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  // console.log("authenticateToken", authenticateToken, token);
  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ error: "Token expired" });
      }
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports =  authenticateToken;
