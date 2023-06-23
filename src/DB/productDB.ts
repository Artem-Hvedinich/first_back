import { ObjectId } from "mongodb";
import { client } from "./db";

export type ProductType = {
  _id?: ObjectId,
  title: string
}
export const productCollections = client.db().collection<ProductType>("products");
