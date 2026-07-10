export const feedbacks = [
  {
    text: "Flora made my anniversary unforgettable with their beautiful arrangement!",
    author: "Emma T.",
  },
  {
    text: "Absolutely stunning bouquet! It looked even better than the photo and arrived right on time.",
    author: "Daniel R.",
  },
  {
    text: "The service was exceptional, and the flowers were fresh!",
    author: "Olivia M.",
  },
  {
    text: "Highly recommend! The centerpieces for our event were gorgeous and lasted for over a week.",
    author: "Liam K.",
  },
  {
    text: "Wonderful customer service and a truly unique selection of flowers. I will definitely order again!",
    author: "Sophia J.",
  },
];

export async function seedFeedbacks(prisma) {
  await prisma.feedback.createMany({ data: feedbacks });
  return feedbacks.length;
}
