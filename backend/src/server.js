import express from 'express'
import { CONNECT_DB, CLOSE_DB, GET_DB } from "~/config/mongodb";
import exitHook from "async-exit-hook";
import { env } from '~/config/environment';
const app = express()

const START_SERVER = () => {
  app.get('/', (req, res) => {
    // Test Absolute import mapOrder
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
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