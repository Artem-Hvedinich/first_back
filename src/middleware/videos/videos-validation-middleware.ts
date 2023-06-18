import { NextFunction, Request, Response } from "express";

const ERROR_400 = (res: Response, field: string) => {
  return res.status(400).send({
    errorsMessages: [
      {
        message: "string",
        field
      }
    ]
  });
};

const availableResolutionsTrueArr: string[] = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

export const titleValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>
  req.body.title && req.body.title.trim().length > 3 && req.body.title.trim().length <= 40 ? next() : ERROR_400(res, "title");

export const authorValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>
  req.body.author && req.body.author.trim().length > 3 && req.body.author.trim().length <= 20 ? next() : ERROR_400(res, "author");

export const checkedAvailableResolutionsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const availableResolutions = req.body.availableResolutions;
  !availableResolutions || availableResolutions.length < 1 || availableResolutions.filter(x => availableResolutionsTrueArr.indexOf(x) === -1).length
    ? ERROR_400(res, "availableResolutions")
    : next();
};

export const minAgeRestrictionMiddleware = (req: Request, res: Response, next: NextFunction) =>
  req.body.minAgeRestriction && (+req.body.minAgeRestriction > 0 && +req.body.minAgeRestriction <= 18)
  || req.body.minAgeRestriction === null ? next() : ERROR_400(res, "minAgeRestriction");

export const publicationDateMiddleware = (req: Request, res: Response, next: NextFunction) =>
  req.body.publicationDate && new Date(req.body.publicationDate) instanceof Date && !isNaN(+new Date(req.body.publicationDate)) ? next() : ERROR_400(res, "publicationDate");
