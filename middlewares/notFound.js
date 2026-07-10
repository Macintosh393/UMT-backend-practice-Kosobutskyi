import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";

export function notFoundHandler(_req, res) {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: apiMessages.notFound });
}
