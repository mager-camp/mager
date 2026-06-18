import prisma from "../config/prisma.js";

const premiumMiddleware = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { isPremium: true, premiumExpiredAt: true },
    });

    const isActive =
      user?.isPremium && (!user.premiumExpiredAt || new Date(user.premiumExpiredAt) > new Date());

    if (!isActive) {
      return res.status(403).json({
        success:    false,
        message:    "Fitur ini khusus untuk member premium.",
        redirectTo: "/user/payment",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default premiumMiddleware;