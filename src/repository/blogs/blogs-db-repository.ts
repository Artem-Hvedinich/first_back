import { blogsCollections, BlogType } from "../../DB/blogsDB";
import { deleteObjectId } from "../../composeble/utils";

type updateData = {
  name: string,
  description: string,
  websiteUrl: string
}

export const blogsRepository = {
  findBlog: async (id?: string): Promise<BlogType[] | BlogType> => {
    let result;
    if (id) {
      result = await blogsCollections.findOne({ id }) as BlogType;
      return deleteObjectId<BlogType>(result);
    }
    result = await blogsCollections.find().toArray();
    return result.map(b => deleteObjectId(b));
  },
  createBlog: async (
    name: string,
    description: string,
    websiteUrl: string
  )
    : Promise<BlogType | null> => {
    const newBlog = {
      id: "blog_" + new Date().getMilliseconds(),
      name,
      description,
      websiteUrl,
      createdAt: new Date(),
      isMembership: false
    };
    const resp = await blogsCollections.insertOne(newBlog);
    console.log(resp, deleteObjectId<BlogType>(newBlog));
    return deleteObjectId<BlogType>(newBlog);
  },
  updateBlog: async ({ name, description, websiteUrl }: updateData, id: string): Promise<boolean> => {
    const result = await blogsCollections.updateOne({ id }, {
      $set: { name, description, websiteUrl, createdAt: new Date() }
    });
    return result.modifiedCount === 1;
  },
  removeOneBlog: async (id: string): Promise<boolean> => {
    const result = await blogsCollections.deleteOne({ id });
    return result.deletedCount === 1;
  },
  removeAllBlogs: async (): Promise<boolean> => {
    const arr = await blogsRepository.findBlog() as BlogType[];
    const result = await blogsCollections.deleteMany();
    return arr.length === 0 ? true : result.deletedCount !== 0;
  }
};
