import { Request, Response, NextFunction } from "express";

type errorMessageType = {
  message: string
  field: string
}

let errorsMessages: errorMessageType[] = [];
export const addErrorsMessages = (field: string) => {
  errorsMessages.push(
    {
      message: "string",
      field
    });
};

export const addNewErrorMessageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  errorsMessages = [];
  next();
};
export const errorCheckingMiddleware = (req: Request, res: Response, next: NextFunction) =>
  errorsMessages.length > 0 ? res.status(400).send({ errorsMessages }) : next();

