import express from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/apiError";

const Router = express.Router();

const createNew = async (req, res, next) => {
  try {
    // await correctCondition.validateAsync(req.body, { abortEarly: false });

    res.status(StatusCodes.CREATED).json({ message: "Note: API create new list boards" })
    // throw new ApiError(StatusCodes.BAD_GATEWAY, "message");
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

export const boardController = { createNew }