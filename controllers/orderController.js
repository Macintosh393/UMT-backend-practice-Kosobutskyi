import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { HttpError } from "../helpers/error.js";
import * as orderModel from "../models/orderModel.js";

export const getOrderList = asyncHandler(async (_req, res) => {
  const orders = await orderModel.findAll();
  res.status(HTTP_STATUS.OK).json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;
  const order = await orderModel.findById(id);

  if (!order) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.orderNotFound);
  }

  res.status(HTTP_STATUS.OK).json(order);
});

export const createOrder = asyncHandler(async (req, res) => {
  const order = await orderModel.create(req.validatedBody);

  res.status(HTTP_STATUS.CREATED).json({
    message: apiMessages.orderCreated,
    order,
  });
});

export const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;

  const existing = await orderModel.findById(id);

  if (!existing) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.orderNotFound);
  }

  const order = await orderModel.update(id, req.validatedBody);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.orderUpdated,
    order,
  });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;

  const existing = await orderModel.findById(id);

  if (!existing) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.orderNotFound);
  }
  const order = await orderModel.remove(id);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.orderDeleted,
    order,
  });
});
