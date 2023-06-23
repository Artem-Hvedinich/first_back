import { client } from "./db";
import { ObjectId } from "mongodb";

export type PostType = {
  id: string,
  // _id?: ObjectId,
  title: string,
  shortDescription: string,
  content: string,
  blogId: string,
  blogName: string
  createdAt: Date
}
export type UpdatePostType = {
  title: string,
  shortDescription: string,
  content: string,
  blogId: string,
}

export type CreatePostType = {
  title: string,
  shortDescription: string,
  content: string,
  blogId: string,
  blogName: string
  createdAt: Date
}
export const postsCollections = client.db().collection<PostType>("posts");
