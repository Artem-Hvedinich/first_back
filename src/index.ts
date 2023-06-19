import express, { Request, Response } from "express";
import { productsRouter } from "./router/products-router";
import { runDB } from "./db";
import bodyParser from "body-parser";
import { videosRouter } from "./router/videos/videos-router";
import { videosRepository } from "./repository/videos/videos-repository";

export const app = express();
const port = process.env.PORT || "8080";

app.use(bodyParser.json());
const parserMiddleware = express.json();
app.use(parserMiddleware);
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


app.get("/", (req: Request, res: Response) => res.send("First Back"));
app.use("/product", productsRouter);
app.use("/videos", videosRouter);
app.delete("/testing/all-data", async (req: Request, res: Response) => {
  const isRemove = await videosRepository.removeAllVideos();
  isRemove && res.send(204);
});
const startApp = async () => {
  // await runDB();
  app.listen(port, () => {
    console.log(`🌐 Example app listening on port ${port}`);
  });
};

startApp();
