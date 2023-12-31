import express, { Request, Response } from "express";
import { productsRouter } from "./router/products-router";
import { runDB } from "./DB/db";
import { videosRouter } from "./router/videos/videos-router";
import { videosRepository } from "./repository/videos/videos-repository";
import { blogsRouter } from "./router/blogs/blogs-router";
import { blogsRepository } from "./repository/blogs/blogs-db-repository";
import { postsRouter } from "./router/posts/posts-router";
import { postsRepository } from "./repository/posts/posts-db-repository";

export const app = express();
const port = process.env.PORT || "8080";
app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req: Request, res: Response) => res.send("First Back"));
app.use("/product", productsRouter);
app.use("/videos", videosRouter);
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.delete("/testing/all-data", async (req: Request, res: Response) => {
  const isRemoveVideos = await videosRepository.removeAllVideos();
  const isRemoveBlogs = await blogsRepository.removeAllBlogs();
  const isRemovePosts = await postsRepository.removeAllPosts();
  isRemoveBlogs && isRemovePosts && isRemoveVideos ? res.sendStatus(204) : res.sendStatus(404);
});
const startApp = async () => {
  await runDB();
  app.listen(port, () => {
    console.log(`🌐 Example app listening on port ${port}`);
  });
};

startApp();
