import { body } from "express-validator";

export const blogValidate = {
  name: body("name").trim().notEmpty().isLength({ max: 15 }).withMessage("max length should be 15 symbols"),
  description: body("description").trim().notEmpty().isLength({ max: 500 }).withMessage("Field description required to fill"),
  websiteUrlLength: body("websiteUrl").trim().notEmpty().isLength({ max: 100 }).withMessage("Website url is too long"),
  websiteUrl: body("websiteUrl").trim().custom(v =>
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(v)).withMessage("website url does not match the template")

};

