const pelatihMiddleware = (req, res, next) => {
  if (req.user.role !== 'pelatih') {
    return res.status(403).json({
      success: false,
      message: 'Pelatih access only',
    });
  }

  next();
};

export default pelatihMiddleware;
