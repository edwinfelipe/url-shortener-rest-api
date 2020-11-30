const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).json({ error: "No authentication provided" });
  const token = authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "No authentication provided" });

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, decoded) => {
    if (err || !decoded) {
      return res
        .status(401)
        .json({ error: "Authentication provided is not valid" });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = isAuthenticated;
