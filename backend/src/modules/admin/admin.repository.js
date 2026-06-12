import prisma from "../../config/prisma.js";
import { ROLES } from "../../constants/roles.js";

const activeUserWhere = {
  deletedAt: null,
  role: {
    name: ROLES.USER,
  },
};

const allUserWhere = {
  role: {
    name: ROLES.USER,
  },
};

let adminSettingTableReady = false;

const ensureAdminSettingTable = async () => {
  if (adminSettingTableReady) return;

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "AdminSetting" (
      "id" TEXT NOT NULL,
      "adminId" TEXT NOT NULL,
      "notifEmail" BOOLEAN NOT NULL DEFAULT true,
      "notifSystem" BOOLEAN NOT NULL DEFAULT true,
      "notifReport" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "AdminSetting_pkey" PRIMARY KEY ("id")
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "AdminSetting_adminId_key"
    ON "AdminSetting"("adminId")
  `);

  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'AdminSetting_adminId_fkey'
      ) THEN
        ALTER TABLE "AdminSetting"
        ADD CONSTRAINT "AdminSetting_adminId_fkey"
        FOREIGN KEY ("adminId")
        REFERENCES "User"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
      END IF;
    END $$;
  `);

  adminSettingTableReady = true;
};

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const previousMonthStart = (date) =>
  new Date(date.getFullYear(), date.getMonth() - 1, 1);

const calculateGrowthPercent = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(2));
};

const formatUser = (user) => ({
  id: user.id,
  fullName: user.fullName,
  name: user.fullName,
  nama: user.fullName,
  email: user.email,
  phone: user.phone,
  telp: user.phone,
  profilePicture: user.profilePicture,
  avatarUrl: user.profilePicture,
  role: user.role?.name,
  plan: user.isPremium ? "premium" : "regular",
  accountType: user.isPremium ? "Premium" : "Biasa",
  tipe: user.isPremium ? "Premium" : "Biasa",
  isPremium: user.isPremium,
  premiumExpiredAt: user.premiumExpiredAt,
  status: user.deletedAt ? "deleted" : "active",
  statusLabel: user.deletedAt ? "Offline" : "Aktif",
  joinDate: user.createdAt,
  registrasi: user.createdAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  deletedAt: user.deletedAt,
});

const formatPayment = (payment) => ({
  id: payment.id,
  invoiceNumber: payment.invoiceNumber,
  userId: payment.user?.id || payment.userId,
  userName: payment.user?.fullName,
  userEmail: payment.user?.email,
  userPhone: payment.user?.phone,
  courseId: payment.course?.id || payment.courseId,
  packageName: payment.course?.title || "Paket Premium",
  packageType: payment.course?.type,
  price: Number(payment.amount || 0),
  amount: Number(payment.amount || 0),
  status: payment.status,
  paymentMethod: payment.paymentMethod?.name || "-",
  paymentMethodCategory: payment.paymentMethod?.category || "-",
  referenceId: payment.invoiceNumber,
  date: payment.paidAt || payment.createdAt,
  paidAt: payment.paidAt,
  createdAt: payment.createdAt,
});

const formatScheduleActivity = (schedule) => ({
  id: schedule.id,
  name: schedule.activity?.name || "Aktivitas",
  coach: schedule.programType || "Mandiri",
  date: schedule.scheduledAt,
  durationMinutes: schedule.workoutLogs?.[0]?.durationMinutes || null,
  duration: schedule.workoutLogs?.[0]?.durationMinutes
    ? `${schedule.workoutLogs[0].durationMinutes} Menit`
    : "-",
  status: schedule.status,
  intensity: schedule.intensity,
});

export const getDashboardSummaryRepo = async () => {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const lastMonthStart = previousMonthStart(now);

  const [
    totalUsers,
    totalPremiumUsers,
    totalRevenue,
    currentMonthUsers,
    previousMonthUsers,
    currentMonthPremiumUsers,
    previousMonthPremiumUsers,
    currentMonthRevenue,
    previousMonthRevenue,
  ] = await prisma.$transaction([
    prisma.user.count({ where: activeUserWhere }),
    prisma.user.count({ where: { ...activeUserWhere, isPremium: true } }),
    prisma.payment.aggregate({ where: { status: "paid" }, _sum: { amount: true } }),
    prisma.user.count({
      where: { ...activeUserWhere, createdAt: { gte: thisMonthStart } },
    }),
    prisma.user.count({
      where: {
        ...activeUserWhere,
        createdAt: { gte: lastMonthStart, lt: thisMonthStart },
      },
    }),
    prisma.user.count({
      where: {
        ...activeUserWhere,
        isPremium: true,
        createdAt: { gte: thisMonthStart },
      },
    }),
    prisma.user.count({
      where: {
        ...activeUserWhere,
        isPremium: true,
        createdAt: { gte: lastMonthStart, lt: thisMonthStart },
      },
    }),
    prisma.payment.aggregate({
      where: { status: "paid", createdAt: { gte: thisMonthStart } },
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
      where: {
        status: "paid",
        createdAt: { gte: lastMonthStart, lt: thisMonthStart },
      },
      _sum: { amount: true },
    }),
  ]);

  const currentRevenue = Number(currentMonthRevenue._sum.amount || 0);
  const previousRevenue = Number(previousMonthRevenue._sum.amount || 0);

  return {
    totalUsers,
    totalPremiumUsers,
    totalRevenue: Number(totalRevenue._sum.amount || 0),
    userGrowthPercent: calculateGrowthPercent(currentMonthUsers, previousMonthUsers),
    premiumGrowthPercent: calculateGrowthPercent(
      currentMonthPremiumUsers,
      previousMonthPremiumUsers,
    ),
    revenueGrowthPercent: calculateGrowthPercent(currentRevenue, previousRevenue),
  };
};

export const getAdminUsersRepo = async () => {
  const [items, total] = await prisma.$transaction([
    prisma.user.findMany({
      where: allUserWhere,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        profilePicture: true,
        isPremium: true,
        premiumExpiredAt: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        role: { select: { name: true } },
      },
    }),
    prisma.user.count({ where: allUserWhere }),
  ]);

  return { total, items: items.map(formatUser) };
};

export const getPremiumUsersRepo = async () => {
  const where = {
    user: activeUserWhere,
    course: { type: "premium" },
  };

  const [items, total] = await prisma.$transaction([
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        invoiceNumber: true,
        amount: true,
        status: true,
        createdAt: true,
        paidAt: true,
        user: { select: { id: true, fullName: true, email: true, phone: true } },
        course: { select: { id: true, title: true, type: true } },
        paymentMethod: { select: { name: true, category: true } },
      },
    }),
    prisma.payment.count({ where }),
  ]);

  return { total, items: items.map(formatPayment) };
};

export const getAdminStatisticsRepo = async () => {
  const [premiumUsers, regularUsers, courseDistribution, paymentStatusDistribution] =
    await prisma.$transaction([
      prisma.user.count({ where: { ...activeUserWhere, isPremium: true } }),
      prisma.user.count({ where: { ...activeUserWhere, isPremium: false } }),
      prisma.course.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          type: true,
          _count: { select: { userCourses: true, payments: true } },
        },
      }),
      prisma.payment.groupBy({ by: ["status"], _count: { _all: true } }),
    ]);

  return {
    userComposition: { premium: premiumUsers, regular: regularUsers },
    courseDistribution: courseDistribution.map((course) => ({
      id: course.id,
      name: course.title,
      type: course.type,
      totalEnrollments: course._count.userCourses,
      totalPayments: course._count.payments,
    })),
    paymentStatusDistribution: paymentStatusDistribution.map((item) => ({
      status: item.status,
      total: item._count._all,
    })),
  };
};

export const createAdminUserRepo = (data) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profilePicture: true,
      isPremium: true,
      premiumExpiredAt: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      role: { select: { name: true } },
    },
  });
};

export const getAdminUserByEmailRepo = (email) => {
  return prisma.user.findUnique({ where: { email }, select: { id: true } });
};

export const getAdminUserDetailRepo = async (userId) => {
  const user = await prisma.user.findFirst({
    where: { id: userId, ...allUserWhere },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profilePicture: true,
      isPremium: true,
      premiumExpiredAt: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      role: { select: { name: true } },
      payments: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          invoiceNumber: true,
          amount: true,
          status: true,
          createdAt: true,
          paidAt: true,
          userId: true,
          courseId: true,
          course: { select: { id: true, title: true, type: true } },
          paymentMethod: { select: { name: true, category: true } },
        },
      },
      schedules: {
        orderBy: { scheduledAt: "desc" },
        take: 8,
        select: {
          id: true,
          scheduledAt: true,
          status: true,
          intensity: true,
          programType: true,
          activity: { select: { name: true } },
          workoutLogs: {
            take: 1,
            orderBy: { completedAt: "desc" },
            select: { durationMinutes: true },
          },
        },
      },
    },
  });

  if (!user) return null;

  const formattedUser = formatUser(user);
  const payments = user.payments.map((payment) =>
    formatPayment({ ...payment, user }),
  );
  const activities = user.schedules.map(formatScheduleActivity);
  const latestPaid = payments.find((payment) => payment.status === "paid") || payments[0];

  return {
    ...formattedUser,
    favoriteCourse:
      latestPaid?.packageName || activities[0]?.name || "-",
    paymentMethod: latestPaid?.paymentMethod || "-",
    expiryDate: user.premiumExpiredAt,
    payments,
    activities,
    logs: [
      {
        type: "Registrasi Akun",
        time: user.createdAt,
        location: "SYSTEM",
      },
      {
        type: "Update Terakhir",
        time: user.updatedAt,
        location: "PROFILE",
      },
    ],
  };
};

export const updateAdminUserRepo = (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profilePicture: true,
      isPremium: true,
      premiumExpiredAt: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      role: { select: { name: true } },
    },
  });
};

export const deactivateAdminUserRepo = (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profilePicture: true,
      isPremium: true,
      premiumExpiredAt: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      role: { select: { name: true } },
    },
  });
};

export const activateAdminUserRepo = (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { deletedAt: null },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profilePicture: true,
      isPremium: true,
      premiumExpiredAt: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      role: { select: { name: true } },
    },
  });
};

export const getAdminUserPaymentsRepo = async (userId) => {
  const items = await prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      invoiceNumber: true,
      amount: true,
      status: true,
      createdAt: true,
      paidAt: true,
      userId: true,
      courseId: true,
      user: { select: { id: true, fullName: true, email: true, phone: true } },
      course: { select: { id: true, title: true, type: true } },
      paymentMethod: { select: { name: true, category: true } },
    },
  });

  return { total: items.length, items: items.map(formatPayment) };
};

const normalizeBooleanSetting = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Boolean(value);
};

const formatAdminProfile = (admin, setting = null) => ({
  id: admin.id,
  nama: admin.fullName,
  fullName: admin.fullName,
  email: admin.email,
  phone: admin.phone,
  avatarUrl: admin.profilePicture,
  profilePicture: admin.profilePicture,
  notif_email: setting?.notifEmail ?? true,
  notif_sistem: setting?.notifSystem ?? true,
  notif_laporan: setting?.notifReport ?? false,
  notifEmail: setting?.notifEmail ?? true,
  notifSystem: setting?.notifSystem ?? true,
  notifReport: setting?.notifReport ?? false,
  createdAt: admin.createdAt,
});

export const getAdminProfileRepo = async (adminId) => {
  await ensureAdminSettingTable();

  const admin = await prisma.user.findFirst({
    where: { id: adminId, role: { name: ROLES.ADMIN } },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profilePicture: true,
      createdAt: true,
      adminSetting: {
        select: {
          notifEmail: true,
          notifSystem: true,
          notifReport: true,
        },
      },
    },
  });

  if (!admin) return null;

  return formatAdminProfile(admin, admin.adminSetting);
};

export const updateAdminProfileRepo = async (adminId, payload) => {
  await ensureAdminSettingTable();

  const userData = {};
  if (payload.fullName !== undefined) userData.fullName = payload.fullName;
  if (payload.nama !== undefined) userData.fullName = payload.nama;
  if (payload.email !== undefined) userData.email = payload.email;
  if (payload.phone !== undefined) userData.phone = payload.phone;
  if (payload.profilePicture !== undefined) userData.profilePicture = payload.profilePicture;
  if (payload.avatarUrl !== undefined) userData.profilePicture = payload.avatarUrl;

  const settingData = {};
  if (payload.notif_email !== undefined) {
    settingData.notifEmail = normalizeBooleanSetting(payload.notif_email);
  }
  if (payload.notif_sistem !== undefined) {
    settingData.notifSystem = normalizeBooleanSetting(payload.notif_sistem);
  }
  if (payload.notif_laporan !== undefined) {
    settingData.notifReport = normalizeBooleanSetting(payload.notif_laporan);
  }
  if (payload.notifEmail !== undefined) {
    settingData.notifEmail = normalizeBooleanSetting(payload.notifEmail);
  }
  if (payload.notifSystem !== undefined) {
    settingData.notifSystem = normalizeBooleanSetting(payload.notifSystem);
  }
  if (payload.notifReport !== undefined) {
    settingData.notifReport = normalizeBooleanSetting(payload.notifReport);
  }

  await prisma.$transaction(async (tx) => {
    if (Object.keys(userData).length > 0) {
      await tx.user.update({ where: { id: adminId }, data: userData });
    }

    if (Object.keys(settingData).length > 0) {
      await tx.adminSetting.upsert({
        where: { adminId },
        update: settingData,
        create: {
          adminId,
          notifEmail: settingData.notifEmail ?? true,
          notifSystem: settingData.notifSystem ?? true,
          notifReport: settingData.notifReport ?? false,
        },
      });
    }
  });

  return getAdminProfileRepo(adminId);
};
