import multer from "multer";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";

export function errorHandler(err, _req, res, _next) {
  if (err instanceof multer.MulterError) {
    const message = err.code === "LIMIT_FILE_SIZE" ? apiMessages.fileSizeLimitExceeded : err.message;
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message });
  }

  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || apiMessages.serverError;

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(status).json({ message });
}
