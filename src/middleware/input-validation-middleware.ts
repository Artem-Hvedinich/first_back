import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  !errors.isEmpty()
    ? res.status(400).json(
      {
        errorsMessages: errors.array().map(e => ({
            message: e.msg,
            field: e.path
          })
        )
      })
    : next();
};
export const authValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send(401);
    return;
  } else next();
};

export const checkedIdValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  !errors.isEmpty()
    ? res.send(404)
    : next();
};

