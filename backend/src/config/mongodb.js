import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environment";

let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(env.MONOGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
}
export const CLOSE_DB = async () => {
  console.log("Disconnected!")
  await mongoClientInstance.close();
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error("Mus connect to database first!");
  return trelloDatabaseInstance;
}