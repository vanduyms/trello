import express from 'express'
import { CONNECT_DB, CLOSE_DB, GET_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from '~/config/environment';
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';
import cors from "cors";
import { corsOptions } from './config/cors';
import cookieParser from "cookie-parser";
import { createServer } from 'http';
import { Server } from 'socket.io';
import SocketServer from './sockets';

const START_SERVER = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(corsOptions));

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    SocketServer(socket);
  });

  app.use("/v1", APIs_V1);
  app.use(errorHandlingMiddleware);

  httpServer.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    console.log("Disconnecting from Mongo DB ... ");
    CLOSE_DB().then(() => {
      console.log("Disconnected from Mongo DB ... ");
      process.exit();
    });
  })
}

(
  async () => {
    try {
      console.log("Connecting to Mongo DB ... ");
      await CONNECT_DB();
      console.log("Connected to MongoDB");

      START_SERVER();
    } catch (error) {
      console.error(error);
      process.exit(0);
    }
  }
)()

// CONNECT_DB()
//   .then(() => console.log("Connected to MongoDB"))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error);
//     process.exit(0);
//   });