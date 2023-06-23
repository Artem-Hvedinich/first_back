import { client } from "./db";
import { ObjectId } from "mongodb";

export type PostType = {
  _id?: ObjectId,
  title: string,
  shortDescription: string,
  content: string,
  blogId: ObjectId,
  blogName: string
  createdAt: Date
}
export type UpdatePostType = {
  title: string,
  shortDescription: string,
  content: string,
  blogId: ObjectId,
}

export type CreatePostType = {
  title: string,
  shortDescription: string,
  content: string,
  blogId: ObjectId,
  blogName: string
  createdAt: Date
}
export const postsCollections = client.db().collection<PostType>("posts");
