import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../helpers/cloudinaryStorage.js";
import { HttpError } from "../helpers/error.js";
import * as bouquetModel from "../models/bouquetModel.js";

export const getBouquetList = asyncHandler(async (req, res) => {
  const { page, "per-page": perPage, category } = req.validateQuery;

  const result = await bouquetModel.findPaginated({
    page,
    perPage,
    category,
  });

  res.status(HTTP_STATUS.OK).json(result);
});

export const getBouquetById = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;
  const bouquet = await bouquetModel.findById(id);

  if (!bouquet) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.bouquetNotFound);
  }

  res.status(HTTP_STATUS.OK).json(bouquet);
});

export const createBouquet = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new HttpError(HTTP_STATUS.BAD_REQUEST, apiMessages.bouquetImageRequired);
  }

  const img = await uploadImageToCloudinary(req.file);

  const bouquet = await bouquetModel.create({ ...req.validatedBody, img });

  res.status(HTTP_STATUS.CREATED).json({
    message: apiMessages.bouquetCreated,
    bouquet,
  });
});

export const updateBouquet = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;

  const existing = await bouquetModel.findById(id);

  if (!existing) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.bouquetNotFound);
  }

  const updateData = { ...req.validatedBody };

  if (!req.file && Object.keys(updateData).length === 0) {
    throw new HttpError(HTTP_STATUS.BAD_REQUEST, apiMessages.bouquetUpdateEmpty);
  }

  if (req.file) {
    updateData.img = await uploadImageToCloudinary(req.file);

    if (existing.img) {
      await deleteImageFromCloudinary(existing.img);
    }
  }

  const bouquet = await bouquetModel.update(id, updateData);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.bouquetUpdated,
    bouquet,
  });
});

export const deleteBouquet = asyncHandler(async (req, res) => {
  const { id } = req.validatedParams;

  const existing = await bouquetModel.findById(id);

  if (!existing) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, apiMessages.bouquetNotFound);
  }

  if (existing.img) {
    await deleteImageFromCloudinary(existing.img);
  }

  const bouquet = await bouquetModel.remove(id);

  res.status(HTTP_STATUS.OK).json({
    message: apiMessages.bouquetDeleted,
    bouquet,
  });
});
