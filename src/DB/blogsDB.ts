import { client } from "./db";
import { ObjectId } from "mongodb";

export type BlogType = {
  id: string
  // _id?: ObjectId
  name: string
  description: string
  websiteUrl: string
  createdAt: Date
  isMembership: boolean
}
export const blogsCollections = client.db().collection<BlogType>("blogs");
