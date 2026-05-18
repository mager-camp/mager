import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: { name: "admin" },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: { name: "user" },
  });

  // admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@mager.com" },
    update: {},
    create: {
      fullName: "Super Admin",
      email: "admin@mager.com",
      passwordHash: hashedPassword,
      roleId: adminRole.id,
    },
  });

  // user
  const user = await prisma.user.upsert({
    where: { email: "fahran@mail.com" },
    update: {},
    create: {
      fullName: "Fahran",
      email: "fahran@mail.com",
      passwordHash: hashedPassword,
      roleId: userRole.id,
      isPremium: true,
    },
  });

  // course
  const course = await prisma.course.create({
    data: {
      title: "Running Fundamentals",
      description: "Belajar dasar lari yang efektif",
      type: "premium",
      price: 150000,
      createdBy: admin.id,
    },
  });

  // payment method
  const paymentMethod = await prisma.paymentMethod.create({
    data: {
      name: "BCA Transfer",
      category: "bank_transfer",
      accountNumber: "1234567890",
      accountName: "PT MAGER",
    },
  });

  // payment
  await prisma.payment.create({
    data: {
      userId: user.id,
      courseId: course.id,
      paymentMethodId: paymentMethod.id,
      invoiceNumber: "INV-001",
      amount: 150000,
      status: "paid",
    },
  });

  // activity
  const running = await prisma.activityTemplate.upsert({
    where: { name: "Running" },
    update: {},
    create: {
      name: "Running",
      category: "sport",
      description: "Running training for pentathlon",
    },
  });

  const swimming = await prisma.activityTemplate.upsert({
    where: { name: "Swimming" },
    update: {},
    create: {
      name: "Swimming",
      category: "sport",
      description: "Swimming training",
    },
  });

  const fencing = await prisma.activityTemplate.upsert({
    where: { name: "Fencing" },
    update: {},
    create: {
      name: "Fencing",
      category: "sport",
      description: "Fencing drills and sparring",
    },
  });

  const shooting = await prisma.activityTemplate.upsert({
    where: { name: "Shooting" },
    update: {},
    create: {
      name: "Shooting",
      category: "sport",
      description: "Laser shooting practice",
    },
  });

  const recovery = await prisma.activityTemplate.upsert({
    where: { name: "Recovery" },
    update: {},
    create: {
      name: "Recovery",
      category: "recovery",
      description: "Recovery session",
    },
  });

  // schedule
  const schedule = await prisma.userSchedule.create({
    data: {
      userId: user.id,
      activityId: running.id,
      scheduledDate: new Date(),
      scheduledTime: "07:00",
      intensity: "medium",
      programType: "endurance",
      alarmEnabled: true,
      alarmTime: "06:30",
    },
  });

  // log
  await prisma.workoutLog.create({
    data: {
      userId: user.id,
      userScheduleId: schedule.id,
      durationMinutes: 45,
      caloriesBurned: 350,
      distanceKm: 5,
    },
  });

  console.log("Seed success");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
