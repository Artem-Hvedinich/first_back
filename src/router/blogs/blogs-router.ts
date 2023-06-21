import { Request, Response, Router } from "express";
import { blogsDB, blogsRepository, BlogType } from "../../repository/blogs/blogs-repository";
import { authValidate } from "../../middleware/auth/auth-validation-middleware";
import {
  authValidationMiddleware,
  checkedIdValidationMiddleware,
  inputValidationMiddleware
} from "../../middleware/input-validation-middleware";
import { blogValidate } from "../../middleware/blogs/blogs-validation-middleware";
import { universalValidate } from "../../middleware/universal/universal-validation-middleware";
import { header } from "express-validator";

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
  header("authorization").custom(v => console.log(v)),
  async (req: Request, res: Response) => {
    const blog = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(blog);
  });

blogsRouter.get("/:id", async (req: Request, res: Response) => {
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
  universalValidate.id<BlogType>(blogsDB),
  checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const isUpdate = blogsRepository.updateBlog(req.body, req.params.id);
    isUpdate ? res.send(204) : res.sendStatus(404);
  });
blogsRouter.delete("/:id",
  authValidate.authorization,
  authValidationMiddleware,
  universalValidate.id<BlogType>(blogsDB),
  checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const isUpdate = blogsRepository.removeOneBlog(req.params.id);
    isUpdate ? res.send(204) : res.sendStatus(404);
  });
