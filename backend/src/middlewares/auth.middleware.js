import jwt from 'jsonwebtoken';

const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    const bearer =
      req.headers.authorization;

    if (!bearer) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    const token = bearer.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
};

export default authMiddleware;