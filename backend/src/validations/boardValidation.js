import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'string.required': "Title is required",
      'string.empty': 'Title is not allowed to empty',
      'string.min': 'Title min 3 chars',
      'string.max': 'Title max 50 chars',
      'string.tim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict().message({
      'string.required': "Description is required",
      'string.empty': 'Description is not allowed to empty',
      'string.min': 'Description min 3 chars',
      'string.max': 'Description max 256 chars',
      'string.tim': 'Description must not have leading or trailing whitespace'
    })
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = { createNew }