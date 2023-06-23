import { postsCollections, PostType, UpdatePostType } from "../../DB/postsDB";
import { ObjectId } from "mongodb";

export const postsRepository = {
  findPost: async (id?: string): Promise<PostType[] | PostType | undefined> => {
    // if (id) return await postsCollections.findOne({ _id: new ObjectId(id) }) as PostType;
    if (id) return await postsCollections.findOne({ id }) as PostType;
    return await postsCollections.find().toArray();
  },
  createPost: async ({ title, shortDescription, content, blogId }: PostType)
    : Promise<PostType | null> => {
    const newPost = {
      id: "post" + new Date(),
      title,
      shortDescription,
      content,
      blogId,
      blogName: "blogName1",
      createdAt: new Date()
    };
    const result = await postsCollections.insertOne(newPost);
    return newPost;
  },
  updatePost: async ({ title, shortDescription, content, blogId }: UpdatePostType, id: string): Promise<boolean> => {
    // const _id = new ObjectId(id);
    let result;
    blogId ?
      result = await postsCollections.updateOne({ id }, {
        $set: { title, shortDescription, content, blogId },
        $setOnInsert: { createdAt: new Date() }
      })
      : result = await postsCollections.updateOne({ id }, {
        $set: { title, shortDescription, content },
        $setOnInsert: { createdAt: new Date() }
      });
    return result.modifiedCount === 1;
  },
  removeOnePost: async (id: string): Promise<boolean> => {
    // const _id = new ObjectId(id);
    const result = await postsCollections.deleteOne({ id });
    return result.deletedCount === 1;
  },
  removeAllPosts: async (): Promise<boolean> => {
    const arr = await postsRepository.findPost() as PostType[];
    const result = await postsCollections.deleteMany();
    return arr.length === 0 ? true : result.deletedCount !== 0;
  }
};
