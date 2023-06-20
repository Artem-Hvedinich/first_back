import { availableResolutionsType } from "../../repository/videos/videos-repository";
import { body } from "express-validator";

const availableResolutionsTrueArr: string[] = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

function isIsoDate(str: string) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return !isNaN(d.getTime()) && d.toISOString() === str;
}

export const videoValidate = {
  title: body("title").trim().exists({ checkFalsy: true }).isLength({
    min: 0,
    max: 40
  }).withMessage("Title max length should be 40 symbols"),

  author: body("author").trim().exists({ checkFalsy: true }).isLength({
    min: 0,
    max: 20
  }).withMessage("Author max length should be 20 symbols"),
  availableResolutions: body("availableResolutions").isArray({ min: 1 })
    .custom(value => !value.filter((x: availableResolutionsType) => availableResolutionsTrueArr.indexOf(<string>x) === -1).length)
    .withMessage(`AvailableResolutions type: Array<${availableResolutionsTrueArr}>`),
  minAgeRestriction: body("minAgeRestriction").isFloat({ min: 1, max: 18 }).optional({ nullable: true })
    .withMessage("minAgeRestriction length should be from 1 to 18"),
  publicationDate: body("publicationDate").custom(v => isIsoDate(v)).withMessage("Publication Date format: 'yyyy-mm-dd hh:mm:ss.mil'"),
  canBeDownloaded: body("canBeDownloaded").isBoolean().withMessage("canBeDownloaded should be true|false")
};
