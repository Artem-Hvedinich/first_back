import { postsCollections, PostType, UpdatePostType } from "../../DB/postsDB";
import { deleteObjectId } from "../../composeble/utils";

export const postsRepository = {
  findPost: async (id?: string): Promise<PostType[] | PostType | undefined> => {
    let result;
    if (id) {
      result = await postsCollections.findOne({ id }) as PostType;
      return deleteObjectId<PostType>(result);
    }
    result = await postsCollections.find().toArray();
    return result.map(m => deleteObjectId<PostType>(m));
  },
  createPost: async ({ title, shortDescription, content, blogId }: PostType)
    : Promise<PostType | null> => {
    const newPost = {
      id: "post" + new Date().getMilliseconds(),
      title,
      shortDescription,
      content,
      blogId,
      blogName: "blogName1",
      createdAt: new Date()
    };
    await postsCollections.insertOne(newPost);
    return deleteObjectId<PostType>(newPost);
  },
  updatePost: async ({ title, shortDescription, content, blogId }: UpdatePostType, id: string): Promise<boolean> => {
    // const _id = new ObjectId(id);
    let result;
    blogId ?
      result = await postsCollections.updateOne({ id }, {
        $set: { title, shortDescription, content, blogId, createdAt: new Date() }
      })
      : result = await postsCollections.updateOne({ id }, {
        $set: { title, shortDescription, content, createdAt: new Date() }
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
