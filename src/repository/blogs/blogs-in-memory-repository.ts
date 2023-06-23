import { BlogType } from "../../DB/blogsDB";
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
  websiteUrl: "string.com",
  createdAt: new Date,
  isMembership: true
}, {
  _id: new ObjectId("blog1"),
  name: "string",
  description: "string",
  websiteUrl: "string.com",
  createdAt: new Date,
  isMembership: true
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
      websiteUrl,
      createdAt: new Date,
      isMembership: true
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

