const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // Get token from request header
    const token = req.headers.authorization?.split(" ")[1];

    // If no token
    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

const counselorOnly = (req, res, next) => {
  if (req.user.role !== "counselor" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Counselor access only" });
  }
  next();
};

module.exports = { protect, adminOnly, counselorOnly };
