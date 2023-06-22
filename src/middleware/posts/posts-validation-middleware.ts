import { body } from "express-validator";

export const postsValidate = {
  title: body("title").trim().notEmpty().isLength({ max: 30 }).withMessage("max length should be 30 symbols"),
  shortDescription: body("shortDescription").trim().notEmpty().isLength({ max: 100 }).withMessage("max length should be 100 symbols"),
  content: body("content").trim().notEmpty().isLength({ max: 1000 }).withMessage("max length should be 1000 symbols")
};
