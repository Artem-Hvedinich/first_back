import { NextFunction, Request, Response } from "express";
import { availableResolutionsType } from "../../router/videos/videos-router";


type errorMessageType = {
  message: string
  field: string
}

let errorsMessages: errorMessageType[] = [];
const addErrorsMessages = (field: string) => {
  errorsMessages.push(
    {
      message: "string",
      field
    });
};

function isIsoDate(str: string) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str; // valid date
}

const availableResolutionsTrueArr: string[] = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

export const errorCheckingMiddleware = (req: Request, res: Response, next: NextFunction) =>
  errorsMessages.length > 0 ? res.status(400).send({ errorsMessages }) : next();

export const addNewErrorMessageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  errorsMessages = [];
  next();
};
export const titleValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title;
  if (!title || title.trim().length > 40) addErrorsMessages("title");
  next();
};

export const authorValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const author = req.body.author;
  if (!author || author.trim().length > 20) addErrorsMessages("author");
  next();
};
export const checkedAvailableResolutionsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const availableResolutions = req.body.availableResolutions;
  if (!availableResolutions || availableResolutions.length < 1 ||
    availableResolutions.filter((x: availableResolutionsType) => availableResolutionsTrueArr.indexOf(x) === -1).length) addErrorsMessages("availableResolutions");
  next();
};

export const minAgeRestrictionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const minAgeRestriction = req.body.minAgeRestriction;
  if (!minAgeRestriction || +minAgeRestriction < 1 || +minAgeRestriction > 18) addErrorsMessages("minAgeRestriction");
  next();
};

export const publicationDateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const publicationDate = req.body.publicationDate;
  if (!isIsoDate(publicationDate)) addErrorsMessages("publicationDate");
  next();
};
export const canBeDownloadedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const canBeDownloaded = req.body.canBeDownloaded;
  if (!typeof canBeDownloaded === "boolean") addErrorsMessages("publicationDate");
  next();
};
