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
}

export type PostType = {
  id: string,
  title: string,
  shortDescription: string,
  content: string,
  blogId: string,
  blogName: string
}
export let postsDB: PostType[] = [
  {
    id: "sadsfdg",
    title: "string",
    shortDescription: "string",
    content: "string",
    blogId: "string",
    blogName: "string"
  }
];
export const postsRepository = {
  findPost: async (id?: string): Promise<PostType[] | PostType | undefined> =>
    id ? postsDB.find(f => f.id === id) : postsDB,

  createPost: async ({ title, shortDescription, content, blogId }: CreatePostType)
    : Promise<PostType | null> => {
    const newBlogs = <PostType>{
      id: "blogs_id_" + postsDB.length,
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
      ? postsDB = postsDB.map((m): PostType => m.id === id ? { ...m, title, shortDescription, content, blogId } : m)
      : postsDB = postsDB.map((m): PostType => m.id === id ? { ...m, title, shortDescription, content } : m);
    return await true;
  },
  removeOnePost: async (id: string): Promise<boolean> => {
    postsDB = postsDB.filter(f => f.id !== id);
    return await true;
  },
  removeAllPosts: async (): Promise<boolean> => {
    postsDB = [];
    return await true;
  }
};

