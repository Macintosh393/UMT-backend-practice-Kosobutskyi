export function getPaginationBounds({ page, perPage, totalItems }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage) || 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);

  return {
    totalItems,
    totalPages,
    safePage,
    skip: (safePage - 1) * perPage,
    take: perPage,
  };
}

export function buildPaginatedResponse(items, { page, perPage, totalItems = null }) {
  const bounds = getPaginationBounds({
    page,
    perPage,
    totalItems: totalItems ?? items.length,
  });

  const data = totalItems !== null ? items : items.slice(bounds.skip, bounds.skip + bounds.take);

  return {
    data: data.map((item) => ({
      ...item,
      id: String(item.id),
    })),
    meta: {
      first: 1,
      prev: bounds.safePage > 1 ? bounds.safePage - 1 : null,
      next: bounds.safePage < bounds.totalPages ? bounds.safePage + 1 : null,
      last: bounds.totalPages,
      pages: bounds.totalPages,
      items: bounds.totalItems,
    },
  };
}
