import { HTTP_STATUS } from "../constants/httpStatus.js";
import { HttpError } from "./error.js";
import { formatJoiError } from "./formatJoiError.js";

export function validateParams(schema) {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      return next(new HttpError(HTTP_STATUS.BAD_REQUEST, formatJoiError(error)));
    }

    req.validatedParams = value;
    return next();
  };
}
