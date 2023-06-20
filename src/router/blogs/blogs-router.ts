import { Request, Response, Router } from "express";
import { blogsRepository } from "../../repository/blogs/blogs-repository";
import { authValidate } from "../../middleware/auth/auth-validation-middleware";
import { authValidationMiddleware, inputValidationMiddleware } from "../../middleware/input-validation-middleware";
import { blogValidate } from "../../middleware/blogs/blogs-validation-middleware";

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
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const blog = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(blog);
  });
