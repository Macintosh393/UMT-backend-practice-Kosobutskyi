import Joi from "joi";

import { commonJoiMessages } from "../constants/messages.js";

export const createOrderSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().label("Ім'я"),
  phone: Joi.string().trim().min(10).max(30).required().label("Телефон"),
  address: Joi.string().trim().min(5).max(200).required().label("Адреса доставки"),
  comment: Joi.string().trim().max(500).allow("").default("").label("Коментар"),
  productId: Joi.number().integer().positive().allow(null).default(null).label("Товар"),
}).messages(commonJoiMessages);

export const updateOrderSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).label("Ім'я"),
  phone: Joi.string().trim().min(10).max(30).label("Телефон"),
  address: Joi.string().trim().min(5).max(200).label("Адреса доставки"),
  comment: Joi.string().trim().max(500).allow("").label("Коментар"),
  productId: Joi.number().integer().positive().allow(null).label("Товар"),
})
  .min(1)
  .messages(commonJoiMessages);
