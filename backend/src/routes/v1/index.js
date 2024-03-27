import express from "express";
import { StatusCodes } from "http-status-codes";
import { authRoutes } from "./authRoutes";
import { boardRoutes } from "./boardRoutes";
import { cardRoutes } from "./cardRoutes";
import { columnRoutes } from "./columnRoutes";
import { commentRoutes } from "./commentRoutes";
import { userRoutes } from "./userRoutes";
const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APIs V1 are ready to use" })
});

Router.use("/", authRoutes);
Router.use("/boards", boardRoutes);
Router.use("/columns", columnRoutes);
Router.use("/cards", cardRoutes);
Router.use("/users", userRoutes);
Router.use("/comments", commentRoutes);

export const APIs_V1 = Router;
