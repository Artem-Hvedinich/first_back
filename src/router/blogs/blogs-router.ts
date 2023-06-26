import { Request, Response, Router } from "express";
import { blogsRepository } from "../../repository/blogs/blogs-db-repository";
import { authValidate } from "../../middleware/auth/auth-validation-middleware";
import {
  authValidationMiddleware,
  checkedIdValidationMiddleware,
  inputValidationMiddleware
} from "../../middleware/input-validation-middleware";
import { blogValidate } from "../../middleware/blogs/blogs-validation-middleware";
import { universalValidate } from "../../middleware/universal/universal-validation-middleware";
import { postsRepository } from "../../repository/posts/posts-db-repository";
import { postsValidate } from "../../middleware/posts/posts-validation-middleware";

export const blogsRouter = Router();

blogsRouter.get("/", async (req: Request, res: Response) => {
  const blogs = await blogsRepository.findBlog();
  res.status(200).send(blogs);
});

blogsRouter.post("/",
  authValidate.authorization,
  authValidationMiddleware,
  blogValidate.name,
  blogValidate.description,
  blogValidate.websiteUrl,
  blogValidate.websiteUrlLength,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const blog = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(blog);
  });

blogsRouter.get("/:id",
  universalValidate.checkBlogParamId,
  checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const blog = await blogsRepository.findBlog(req.params.id);
    if (!blog) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(blog);
  });

blogsRouter.put("/:id",
  authValidate.authorization,
  authValidationMiddleware,
  blogValidate.name,
  blogValidate.description,
  blogValidate.websiteUrl,
  blogValidate.websiteUrlLength,
  inputValidationMiddleware,
  universalValidate.checkBlogParamId,
  checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const isUpdate = await blogsRepository.updateBlog(req.body, req.params.id);
    isUpdate ? res.sendStatus(204) : res.sendStatus(404);
  });
blogsRouter.delete("/:id",
  authValidate.authorization,
  authValidationMiddleware,
  universalValidate.checkBlogParamId,
  checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const isRemove = await blogsRepository.removeOneBlog(req.params.id);
    isRemove ? res.sendStatus(204) : res.sendStatus(404);
  });

blogsRouter.get("/:id/posts",
  authValidate.authorization,
  authValidationMiddleware,
  postsValidate.title,
  postsValidate.shortDescription,
  postsValidate.content,
  universalValidate.checkUpdateBlogBodyId,
  inputValidationMiddleware,
  universalValidate.checkBlogParamId,
  checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const post = await postsRepository.createPost(req.body);
    post ? res.status(201).send(post) : res.sendStatus(404);
  });
