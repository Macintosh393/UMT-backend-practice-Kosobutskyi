import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import config from "./envConfigs.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFound.js";
import { feedbackRouter, bouquetRouter, orderRouter } from "./routes/api/index.js";
import swaggerDocument from "./swagger.json" with { type: "json" };

const app = express();

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

const loggerFormat = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(loggerFormat));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.corsOrigin?.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Cors: origin ${origin} is not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/feedbacks", feedbackRouter);
app.use("/api/bouquets", bouquetRouter);
app.use("/api/orders", orderRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
