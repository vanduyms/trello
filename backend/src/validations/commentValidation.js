import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/apiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    userEmail: Joi.string().email().required().trim().strict(),
    userAvatar: Joi.string().required().trim().strict(),
    userDescription: Joi.string().required().trim().strict(),
    userDisplayName: Joi.string().required().trim().strict(),
    content: Joi.string().required().trim().strict(),


    title: Joi.string().required().min(3).max(50).trim().strict(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
  }
}

export const cardValidation = { createNew }