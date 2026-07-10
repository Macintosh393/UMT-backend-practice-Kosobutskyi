import Joi from "joi";

import { commonJoiMessages } from "../constants/messages.js";

export const createFeedbackSchema = Joi.object({
  text: Joi.string().trim().min(10).max(2000).required().label("Текст відгуку"),
  author: Joi.string().trim().min(2).max(100).required().label("Автор"),
}).messages(commonJoiMessages);

export const updateFeedbackSchema = Joi.object({
  text: Joi.string().trim().min(10).max(2000).label("Текст відгуку"),
  author: Joi.string().trim().min(2).max(100).label("Автор"),
})
  .min(1)
  .messages(commonJoiMessages);
