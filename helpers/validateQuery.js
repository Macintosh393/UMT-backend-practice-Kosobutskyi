import { HTTP_STATUS } from "../constants/httpStatus.js";
import { HttpError } from "./error.js";
import { formatJoiError } from "./formatJoiError.js";

export function validateQuery(schema) {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      return next(new HttpError(HTTP_STATUS.BAD_REQUEST, formatJoiError(error)));
    }

    req.validateQuery = value;
    return next();
  };
}
