import { Request, Response, Router } from "express";
import { blogsRepository } from "../../repository/blogs/blogs-repository";
import {
  addNewErrorMessageMiddleware,
  errorCheckingMiddleware
} from "../../middleware/errors/errors-validation-middleware";

export const blogsRouter = Router();

blogsRouter.get("/", async (req: Request, res: Response) => {
  const blogs = await blogsRepository.findBlog();
  res.status(200).send(blogs);
});

blogsRouter.post("/",
  addNewErrorMessageMiddleware,


  errorCheckingMiddleware,
  async (req: Request, res: Response) => {
    const blog = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(blog);
  });
