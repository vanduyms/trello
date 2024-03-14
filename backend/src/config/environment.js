import "dotenv/config";

export const env = {
  MONOGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
}