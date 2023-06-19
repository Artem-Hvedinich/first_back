import { Request, Response, Router } from "express";
import { videosRepository } from "../../repository/videos/videos-repository";
import {
  addNewErrorMessageMiddleware,
  authorValidationMiddleware, canBeDownloadedMiddleware,
  checkedAvailableResolutionsMiddleware, errorCheckingMiddleware,
  minAgeRestrictionMiddleware,
  publicationDateMiddleware,
  titleValidationMiddleware
} from "../../middleware/videos/videos-validation-middleware";

export type availableResolutionsType = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160";

export type VideoType = {
  id: number,
  title: string,
  author: string,
  canBeDownloaded: boolean,
  minAgeRestriction: null | number,
  createdAt: string
  publicationDate: string
  availableResolutions: availableResolutionsType[]
}
export const videosRouter = Router();

videosRouter.get("/", async (req: Request, res: Response) => {
  const videos = await videosRepository.findVideos();
  res.status(200).send(videos);
});
videosRouter.post("/",
  addNewErrorMessageMiddleware,
  titleValidationMiddleware,
  authorValidationMiddleware,
  checkedAvailableResolutionsMiddleware,
  canBeDownloadedMiddleware,
  errorCheckingMiddleware,
  async (req: Request, res: Response) => {
    const newVideo = await videosRepository.createVideos(req.body.title, req.body.author, req.body.availableResolutions);
    res.status(201).send(newVideo);
  });
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
  addNewErrorMessageMiddleware,
  titleValidationMiddleware,
  authorValidationMiddleware,
  minAgeRestrictionMiddleware,
  publicationDateMiddleware,
  checkedAvailableResolutionsMiddleware,
  canBeDownloadedMiddleware,
  errorCheckingMiddleware,
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
