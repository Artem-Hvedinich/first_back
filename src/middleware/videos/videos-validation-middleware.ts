import { NextFunction, Request, Response } from "express";

const ERROR_400 = (res: Response) => {
  return res.status(400).send({
    "errorsMessages": [
      {
        "message": "string",
        "field": "string"
      }
    ]
  });
};

const availableResolutionsTrueArr: string[] = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

export const titleValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>
  req.body.title.trim().length > 3 ? next() : ERROR_400(res);

export const authorValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>
  req.body.author.trim().length > 3 ? next() : ERROR_400(res);

export const checkedAvailableResolutionsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const availableResolutions = req.body.availableResolutions;
  !availableResolutions || availableResolutions.length < 1
    ? ERROR_400(res)
    : !availableResolutions.filter(x => availableResolutionsTrueArr.indexOf(x) === -1).length ? next() : ERROR_400(res);
};

export const idValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return req.params.id ? next() : res.send(404);
}


