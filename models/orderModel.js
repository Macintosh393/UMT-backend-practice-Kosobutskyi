import prisma from "../helpers/prisma.js";

export async function findAll() {
  return prisma.order.findMany({
    orderBy: { id: "asc" },
  });
}

export async function findById(id) {
  return prisma.order.findUnique({
    where: { id },
  });
}

export async function create(orderPayload) {
  return prisma.order.create({
    data: orderPayload,
  });
}

export async function update(id, data) {
  return prisma.order.update({
    where: { id },
    data,
  });
}

export async function remove(id) {
  return prisma.order.delete({
    where: { id },
  });
}
