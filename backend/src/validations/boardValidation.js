import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/apiError";
import { BOARD_TYPES } from "~/utils/constants";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'string.required': "Title is required",
      'string.empty': 'Title is not allowed to empty',
      'string.min': 'Title min 3 chars',
      'string.max': 'Title max 50 chars',
      'string.tim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(...Object.values(BOARD_TYPES)).required()
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
  }
}

export const boardValidation = { createNew }