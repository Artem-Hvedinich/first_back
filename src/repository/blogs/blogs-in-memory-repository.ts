import { BlogType } from "../../db";
import { ObjectId } from "mongodb";

type updateData = {
  name: string,
  description: string,
  websiteUrl: string
}
export let blogsDB: BlogType[] = [{
  _id: new ObjectId("blog0"),
  name: "string",
  description: "string",
  websiteUrl: "string.com"
}, {
  _id: new ObjectId("blog1"),
  name: "string",
  description: "string",
  websiteUrl: "string.com"
}];
export const blogsRepository = {
  findBlog: async (id?: string): Promise<BlogType[] | BlogType | undefined> =>
    id ? blogsDB.find(f => f._id === new ObjectId(id)) : blogsDB,

  createBlog: async (
    name: string,
    description: string,
    websiteUrl: string
  )
    : Promise<BlogType | null> => {
    const newBlogs = <BlogType>{
      id: "blog" + blogsDB.length,
      name,
      description,
      websiteUrl
    };
    blogsDB.push(newBlogs);
    return await newBlogs;
  },
  updateBlog: async ({ name, description, websiteUrl }: updateData, id: string): Promise<boolean> => {
    console.log("in updateBlog", id);
    blogsDB = blogsDB.map((m): BlogType => m._id === new ObjectId(id) ? { ...m, name, description, websiteUrl } : m);
    return await true;
  },
  removeOneBlog: async (id: string): Promise<boolean> => {
    blogsDB = blogsDB.filter(f => f._id !== new ObjectId(id));
    return await true;
  },
  removeAllBlogs: async (): Promise<boolean> => {
    blogsDB = [];
    return await true;
  }
};

