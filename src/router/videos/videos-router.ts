import { Request, Response, Router } from "express";
import { videosRepository } from "../../repository/videos/videos-repository";
import { videoValidate } from "../../middleware/videos/videos-validation-middleware";
import { inputValidationMiddleware } from "../../middleware/input-validation-middleware";

export const videosRouter = Router();

videosRouter.get("/", async (req: Request, res: Response) => {
  const videos = await videosRepository.findVideos();
  res.status(200).send(videos);
});
videosRouter.post("/",
  videoValidate.title,
  videoValidate.author,
  videoValidate.availableResolutions,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newVideo = await videosRepository.createVideos(req.body.title, req.body.author, req.body.availableResolutions);
    res.status(201).send(newVideo);
  }
);
videosRouter.get("/:id",
  async (req: Request, res: Response) => {
    const video = await videosRepository.findVideos(+req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(video);
  });
videosRouter.put("/:id",
  videoValidate.title,
  videoValidate.author,
  videoValidate.availableResolutions,
  videoValidate.minAgeRestriction,
  videoValidate.publicationDate,
  videoValidate.canBeDownloaded,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const video = await videosRepository.findVideos(+req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    const isUpdate = await videosRepository.updateVideos(req.body, +req.params.id);
    isUpdate ? res.send(204) : res.sendStatus(404);
  });

videosRouter.delete("/:id", async (req: Request, res: Response) => {
  const video = await videosRepository.findVideos(+req.params.id);
  if (!video) {
    res.sendStatus(404);
    return;
  }
  const isRemove = await videosRepository.removeOneVideo(+req.params.id);
  isRemove ? res.send(204) : res.sendStatus(404);
});
