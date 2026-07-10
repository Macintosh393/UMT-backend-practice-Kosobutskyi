import { HTTP_STATUS } from "../constants/httpStatus.js";
import { HttpError } from "./error.js";
import { formatJoiError } from "./formatJoiError.js";

export function validateBody(schema) {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      return next(new HttpError(HTTP_STATUS.BAD_REQUEST, formatJoiError(error)));
    }

    req.validatedBody = value;
    return next();
  };
}
