import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

export type ProductType = {
  _id?: ObjectId,
  title: string
}

export type BlogType = {
  _id?: ObjectId,
  name: string,
  description: string,
  websiteUrl: string
}

const url: string = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";
const client = new MongoClient(url);

export const productCollections = client.db().collection<ProductType>("products");
export const blogsCollections = client.db().collection<BlogType>("blogs");

export const runDB = async () => {
  try {
    await client.connect();
    console.log("✅ Connect successfully to server");
  } catch (e) {
    console.log("❗️Don't Connect successfully to server");
    await client.close();
  }
};
