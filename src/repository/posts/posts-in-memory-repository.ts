import { CreatePostType, PostType, UpdatePostType } from "../../DB/postsDB";
import { ObjectId } from "mongodb";

export let postsDB: PostType[] = [];
export const postsRepository = {
  findPost: async (id?: string): Promise<PostType[] | PostType | undefined> =>
    id ? postsDB.find(f => f.id === id) : postsDB,

  createPost: async ({ title, shortDescription, content, blogId }: CreatePostType)
    : Promise<PostType | null> => {
    const newBlogs = <PostType>{
      id: "post" + new Date(),
      title,
      shortDescription,
      content,
      blogId,
      blogName: "blogName" + postsDB.length
    };
    postsDB.push(newBlogs);
    return await newBlogs;
  },
  updatePost: async ({ title, shortDescription, content, blogId }: UpdatePostType, id: string): Promise<boolean> => {
    blogId
      ? postsDB = postsDB.map((m): PostType => m.id === id ? {
        ...m,
        title,
        shortDescription,
        content,
        blogId
      } : m)
      : postsDB = postsDB.map((m): PostType => m.id === id ? {
        ...m,
        title,
        shortDescription,
        content
      } : m);
    return await true;
  },
  removeOnePost: async (id: string): Promise<boolean> => {
    postsDB = postsDB.filter(f => f.id !== id);
    // postsDB = postsDB.filter(f => f._id !== new ObjectId(id));
    return await true;
  },
  removeAllPosts: async (): Promise<boolean> => {
    postsDB = [];
    return await true;
  }
};

