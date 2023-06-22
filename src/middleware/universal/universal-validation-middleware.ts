import { body, param } from "express-validator";
import { blogsDB } from "../../repository/blogs/blogs-repository";
import { postsDB } from "../../repository/posts/posts-repository";

export const universalValidate = {
  checkPostParamId: param("id").custom(v => postsDB.filter(el => el.id === v).length > 0),
  checkBlogParamId: param("id").custom(v => blogsDB.filter(el => el.id === v).length > 0),
  checkBlogBodyId: body("id").custom(v => blogsDB.filter(el => el.id === v).length > 0)
};
