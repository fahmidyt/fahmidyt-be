import mongoose from "mongoose";
import {
  MONGODB_AUTH,
  MONGODB_DATABASE,
  MONGODB_HOST,
  MONGODB_PASSWORD,
  MONGODB_PORT,
  MONGODB_USERNAME,
} from "@utils/env";

const URI: string = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`
const OPT: mongoose.ConnectOptions = {
  user: MONGODB_USERNAME,
  pass: MONGODB_PASSWORD,
  authSource: MONGODB_AUTH,
}

const InitDatabase =  async (): Promise<void> => {
  try {
    await mongoose.connect(URI, OPT)
    console.log(`Successfully connected to database: ${MONGODB_DATABASE}`)
  } catch (err) {
    console.error(`DATABASE ERROR: `, err)

    process.exit()
  }
}

export default InitDatabase
