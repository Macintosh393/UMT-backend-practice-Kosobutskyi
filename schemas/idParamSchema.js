import Joi from "joi";

import { commonJoiMessages } from "../constants/messages.js";

export const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().label("ID"),
}).messages(commonJoiMessages);
