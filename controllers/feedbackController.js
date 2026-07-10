import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { HttpError } from "../helpers/error.js";
import * as feedbackModel from "../models/feedbackModel.js";

export const getFeedbackList = asyncHandler(async (_req, res) => {
  const feedbacks = await feedbackModel.findAll();
  res.status(HTTP_STATUS.OK).json(feedbacks);
});

export const getFeedbackById = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;
  const item = await feedbackModel.findById(id);

  if (!item) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.feedbackNotFound);
  }

  res.status(HTTP_STATUS.OK).json(item);
});

export const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await feedbackModel.create(req.validatedBody);

  res.status(HTTP_STATUS.CREATED).json({
    message: apiMessages.feedbackCreated,
    feedback,
  });
});

export const updateFeedback = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;

  const existing = await feedbackModel.findById(id);

  if (!existing) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.feedbackNotFound);
  }

  const feedback = await feedbackModel.update(id, req.validatedBody);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.feedbackUpdated,
    feedback,
  });
});

export const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;

  const existing = await feedbackModel.findById(id);

  if (!existing) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.feedbackNotFound);
  }

  const feedback = await feedbackModel.remove(id);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.feedbackDeleted,
    feedback,
  });
});
