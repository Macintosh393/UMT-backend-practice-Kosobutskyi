import "dotenv/config";
import app from "./app.js";
import config from "./envConfigs.js";
import prisma from "./helpers/prisma.js";

async function shutdown() {
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

await prisma.$connect();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Swagger UI: http://localhost:${config.port}/api-docs`);
});
