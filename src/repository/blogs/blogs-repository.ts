type updateData = {}

export type BlogType = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string
}
export let blogsDB: BlogType[] = [
  {
    id: "sadmasd",
    name: "string",
    description: "string",
    websiteUrl: "string.com"
  }
];
export const blogsRepository = {
  findBlog: async (id?: string): Promise<BlogType[] | BlogType | undefined> =>
    id ? blogsDB.find(f => f.id === id) : blogsDB,

  createBlog: async (
    name: string,
    description: string,
    websiteUrl: string
  )
    : Promise<BlogType | null> => {
    const newBlogs = <BlogType>{
      id: "blogs_id_" + blogsDB.length,
      name,
      description,
      websiteUrl
    };
    blogsDB.push(newBlogs);
    return await newBlogs;
  },
  updateBlog: async (data: updateData, id: string): Promise<boolean> => {
    blogsDB = blogsDB.map((m): BlogType => m.id === id ? <BlogType>({}) : m);
    return await true;
  },
  removeOneBlog: async (id: string): Promise<boolean> => {
    blogsDB = blogsDB.filter(f => f.id !== id);
    return await true;
  },
  removeAllBlogs: async (): Promise<boolean> => {
    blogsDB = [];
    return await true;
  }
};

