type BlogType = {
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
  }
  // updateVideos: async (data: updateData, id: number): Promise<boolean> => {
  //   videosDB = videosDB.map((m): VideoType => m.id === id ? <VideoType>({
  //     ...m,
  //     title: data.title,
  //     author: data.author,
  //     availableResolutions: [...data.availableResolutions],
  //     canBeDownloaded: data.canBeDownloaded,
  //     minAgeRestriction: data.minAgeRestriction,
  //     publicationDate: data.publicationDate
  //   }) : m);
  //   return await true;
  // },
  // removeOneVideo: async (id: number): Promise<boolean> => {
  //   videosDB = videosDB.filter(f => f.id !== id);
  //   return await true;
  // },
  // removeAllVideos: async (): Promise<boolean> => {
  //   videosDB = [];
  //   return await true;
  // }
};

