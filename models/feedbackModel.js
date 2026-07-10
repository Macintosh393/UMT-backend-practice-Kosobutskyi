import prisma from "../helpers/prisma.js";

function formatFeedback(feedback) {
  return { ...feedback, id: String(feedback.id) };
}

export async function findAll() {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: { id: "asc" },
  });

  return feedbacks.map(formatFeedback);
}

export async function findById(id) {
  const feedback = await prisma.feedback.findUnique({
    where: { id },
  });

  return feedback ? formatFeedback(feedback) : null;
}

export async function create(data) {
  const feedback = await prisma.feedback.create({ data });

  return formatFeedback(feedback);
}

export async function update(id, data) {
  const feedback = await prisma.feedback.update({
    where: { id },
    data,
  });

  return formatFeedback(feedback);
}

export async function remove(id) {
  const feedback = await prisma.feedback.delete({
    where: { id },
  });

  return formatFeedback(feedback);
}
