import { Request, Response, Router } from "express";
import { postsRepository } from "../../repository/posts/posts-repository";
import { postsValidate } from "../../middleware/posts/posts-validation-middleware";
import { universalValidate } from "../../middleware/universal/universal-validation-middleware";
import { authValidate } from "../../middleware/auth/auth-validation-middleware";
import {
  authValidationMiddleware,
  checkedIdValidationMiddleware,
  inputValidationMiddleware
} from "../../middleware/input-validation-middleware";

export const postsRouter = Router();

postsRouter.get("/", async (req: Request, res: Response) => {
  const posts = await postsRepository.findPost();
  res.status(200).send(posts);
});

postsRouter.post("/",
  authValidate.authorization,
  authValidationMiddleware,
  postsValidate.title,
  postsValidate.shortDescription,
  postsValidate.content,
  universalValidate.checkBlogBodyId,
  inputValidationMiddleware,
  // checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const post = await postsRepository.createPost(req.body);
    res.status(201).send(post);
  });
postsRouter.get("/:id", async (req: Request, res: Response) => {
  const post = await postsRepository.findPost(req.params.id);
  console.log(post);
  if (!post) {
    res.sendStatus(404);
    return;
  }
  res.status(200).send(post);
});

postsRouter.put("/:id",
  authValidate.authorization,
  authValidationMiddleware,
  postsValidate.title,
  postsValidate.shortDescription,
  postsValidate.content,
  universalValidate.checkBlogBodyId,
  inputValidationMiddleware,
  universalValidate.checkPostParamId,
  checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const isUpdate = await postsRepository.updatePost(req.body, req.params.id);
    isUpdate ? res.sendStatus(204) : res.sendStatus(404);
  });
postsRouter.delete("/:id",
  authValidate.authorization,
  authValidationMiddleware,
  universalValidate.checkPostParamId,
  checkedIdValidationMiddleware,
  async (req: Request, res: Response) => {
    const isRemove = await postsRepository.removeOnePost(req.params.id);
    isRemove ? res.sendStatus(204) : res.sendStatus(404);
  });
