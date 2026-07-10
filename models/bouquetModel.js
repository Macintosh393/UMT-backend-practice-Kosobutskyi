import { PRODUCT_CATEGORIES } from "../constants/categories.js";
import { buildPaginatedResponse, getPaginationBounds } from "../helpers/pagination.js";
import prisma from "../helpers/prisma.js";

function formatBouquet(product) {
  return {
    ...product,
    id: String(product.id),
  };
}

export async function findPaginated({ page, perPage, category }) {
  const where = category && PRODUCT_CATEGORIES.includes(category) ? { category } : {};

  const totalItems = await prisma.product.count({ where });
  const { skip, take } = getPaginationBounds({ page, perPage, totalItems });

  const products = await prisma.product.findMany({
    where,
    orderBy: { id: "desc" },
    skip,
    take,
  });

  return buildPaginatedResponse(products, { page, perPage, totalItems });
}

export async function findById(id) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  return product ? formatBouquet(product) : null;
}

export async function create(data) {
  const product = await prisma.product.create({
    data,
  });

  return formatBouquet(product);
}

export async function update(id, data) {
  const product = await prisma.product.update({
    where: { id },
    data,
  });

  return formatBouquet(product);
}

export async function remove(id) {
  const product = await prisma.product.delete({
    where: { id },
  });

  return formatBouquet(product);
}
