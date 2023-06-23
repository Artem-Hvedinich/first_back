import { blogsCollections, BlogType } from "../../db";
import { ObjectId, WithId } from "mongodb";

type updateData = {
  name: string,
  description: string,
  websiteUrl: string
}

export const blogsRepository = {
  findBlog: async (id?: string): Promise<BlogType[] | BlogType> => {
    if (id) {
      return await blogsCollections.findOne({ _id: new ObjectId(id) }) as BlogType;
    }
    return await blogsCollections.find().toArray();
  },
  createBlog: async (
    name: string,
    description: string,
    websiteUrl: string
  )
    : Promise<BlogType | null> => {
    const newBlogs = {
      // _id: "blog" + blogsDB.length,
      name,
      description,
      websiteUrl
    };
    const result = await blogsCollections.insertOne(newBlogs);

    return { ...newBlogs, _id: result.insertedId };
  },
  updateBlog: async ({ name, description, websiteUrl }: updateData, id: string): Promise<boolean> => {
    console.log("updateBlog");
    const _id = new ObjectId(id);
    const result = await blogsCollections.updateOne({ _id }, {
      $set: { name, description, websiteUrl }
    });
    return result.modifiedCount === 1;
  },
  removeOneBlog: async (id: string): Promise<boolean> => {
    const _id = new ObjectId(id);
    const result = await blogsCollections.deleteOne({ _id });
    return result.deletedCount === 1;
  },
  removeAllBlogs: async (): Promise<boolean> => {
    const result = await blogsCollections.deleteMany();
    return result.deletedCount !== 0;
  }
};


