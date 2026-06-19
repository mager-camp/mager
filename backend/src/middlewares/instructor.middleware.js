const adminMiddleware = (
  req,
  res,
  next
) => {
  if (
    req.user.role !== 'instructor'
  ) {
    return res.status(403).json({
      success: false,
      message:
        'Admin access only'
    });
  }

  next();
};

export default adminMiddleware;

