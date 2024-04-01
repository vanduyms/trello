import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/apiError";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().trim().strict(),
    password: Joi.string().required().min(8)
      .max(25)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'password').strict(),
    username: Joi.string().required().strict()
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().strict(),
    fullName: Joi.string().optional(),

    avatar: Joi.string().default(""),
    bio: Joi.string().min(3).max(250).default(""),
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    });
    next();
  } catch (error) {
    console.log(error)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
  }
}


export const userValidation = { createNew, update }