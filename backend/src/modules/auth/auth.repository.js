import prisma from "../../config/prisma.js";

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
    },
  });
};

export const findOrCreateGoogleUser = async ({
  email,
  fullName,
  profilePicture,
}) => {
  const existing = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (existing) return existing;

  return prisma.user.create({
    data: {
      fullName,
      email,
      profilePicture,
      passwordHash: "",
      role: { connect: { name: "user" } },
    },
    include: { role: true },
  });
};

export const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
    },
  });
};

export const createUser = (data) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
    },
  });
};
