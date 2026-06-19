import prisma from "../config/prisma.js";

/**
 * Gate route untuk instructor saja.
 * Harus dipasang setelah authMiddleware.
 * Cek apakah user punya record di tabel Instructor.
 */
const instructorMiddleware = async (req, res, next) => {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: { userId: req.user.id },
    });

    if (!instructor) {
      return res.status(403).json({
        success: false,
        message: "Akses ditolak. Hanya instructor yang dapat melakukan aksi ini.",
      });
    }

    // Simpan instructor data ke req buat dipakai di controller
    req.instructor = instructor;
    next();
  } catch (error) {
    next(error);
  }
};

export default instructorMiddleware;