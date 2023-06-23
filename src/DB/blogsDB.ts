import { client } from "./db";
import { ObjectId } from "mongodb";

export type BlogType = {
  _id?: ObjectId,
  name: string,
  description: string,
  websiteUrl: string
}
export const blogsCollections = client.db().collection<BlogType>("blogs");
