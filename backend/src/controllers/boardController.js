import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

export const boardController = { createNew }