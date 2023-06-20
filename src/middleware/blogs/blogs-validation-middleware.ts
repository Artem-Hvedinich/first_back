import { body } from "express-validator";

const checkString = (value: string) => body(value).trim().notEmpty().withMessage("Field " + value + " required to fill");

export const blogValidate = {
  name: checkString("name"),
  description: checkString("description"),
  websiteUrl: checkString("websiteUrl")

};
