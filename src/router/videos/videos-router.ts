import { Request, Response, Router } from "express";
import { videosRepository } from "../../repository/videos/videos-repository";
import {
  authorValidationMiddleware,
  checkedAvailableResolutionsMiddleware,
  minAgeRestrictionMiddleware,
  publicationDateMiddleware,
  titleValidationMiddleware
} from "../../middleware/videos/videos-validation-middleware";

export type availableResolutionsType = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160";

export type VideoType = {
  createdAt: string
  minAgeRestriction: null | number,
  author: string,
  availableResolutions: availableResolutionsType[]
  id: number,
  title: string,
  canBeDownloaded: boolean,
  publicationDate: string
}

export const videosRouter = Router();

videosRouter.get("/", async (req: Request, res: Response): Promise<VideoType[]> => {
  const videos = await videosRepository.findVideos();
  res.status(200).send(videos);
});
videosRouter.post("/",
  titleValidationMiddleware,
  authorValidationMiddleware,
  checkedAvailableResolutionsMiddleware,
  async (req: Request, res: Response): Promise<VideoType | null> => {
    const newVideo = await videosRepository.createVideos(req.body.title, req.body.author, req.body.availableResolutions);
    res.status(201).send(newVideo);
  });
videosRouter.get("/:id",
  async (req: Request, res: Response): Promise<VideoType | null> => {
    const video = await videosRepository.findVideos(+req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(video);
  });
videosRouter.put("/:id",
  titleValidationMiddleware,
  authorValidationMiddleware,
  minAgeRestrictionMiddleware,
  publicationDateMiddleware,
  checkedAvailableResolutionsMiddleware,
  async (req: Request, res: Response): Promise<boolean> => {
    const video = await videosRepository.findVideos(+req.params.id);
    if (!video) {
      res.sendStatus(404);
      return;
    }
    const isUpdate = await videosRepository.updateVideos(req.body, +req.params.id);
    isUpdate ? res.send(204) : res.sendStatus(404);
  });

videosRouter.delete("/:id", async (req: Request, res: Response): Promise<VideoType | null> => {
  const video = await videosRepository.findVideos(+req.params.id);
  if (!video) {
    res.sendStatus(404);
    return;
  }
  const isRemove = await videosRepository.removeOneVideo(+req.params.id);
  isRemove ? res.send(204) : res.sendStatus(404);
});