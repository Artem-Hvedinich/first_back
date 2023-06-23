import { productCollections, ProductType } from "../../DB/productDB";

export const productsRepository = {
  async getProducts(): Promise<ProductType[]> {
    return productCollections.find({}).toArray();
  },
  async createProduct(title: string): Promise<ProductType | null> {
    if (!title.trim()) {
      return null;
    }
    const result = await productCollections.insertOne({ title });
    return {
      title,
      _id: result.insertedId
    };
  }
};
