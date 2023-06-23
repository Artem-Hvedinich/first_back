import { body, param } from "express-validator";
import { postsRepository } from "../../repository/posts/posts-db-repository";
import { blogsRepository } from "../../repository/blogs/blogs-db-repository";

export const universalValidate = {
  checkPostParamId: param("id").custom(async v => {
    const result = await postsRepository.findPost(v);
    return Array.isArray(result) ? result.length > 0 : Object.keys(result as {}).length > 0;
  }),
  checkBlogParamId: param("id").custom(async v => {
    const result = await blogsRepository.findBlog(v);
    return Array.isArray(result) ? result.length > 0 : Object.keys(result).length > 0;
  }),
  checkUpdateBlogBodyId: body("blogId").custom(async v => {
    if (!v) return false;
    const result = await blogsRepository.findBlog(v);
    return Array.isArray(result) ? result.length > 0 : Object.keys(result).length > 0;
  })
  // checkUpdateBlogBodyId: body("blogId").custom(v => v ? blogsDB.filter(el => el.id === v).length > 0 : true)
};
