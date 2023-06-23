import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const url: string = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";
export const client = new MongoClient(url);
export const runDB = async () => {
  try {
    await client.connect();
    console.log("✅ Connect successfully to server");
  } catch (e) {
    console.log("❗️Don't Connect successfully to server");
    await client.close();
  }
};
