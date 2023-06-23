import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(
      {
        errorsMessages: errors.array({ onlyFirstError: true })
          .map((e: any) => ({
              message: e.msg,
              field: e.path
            })
          )
      });
    return;
  }
  next();
};
export const authValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.sendStatus(401);
    return;
  }
  next();
};

export const checkedIdValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.sendStatus(404);
    return;
  }
  next();
};

