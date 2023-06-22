import { body, param } from "express-validator";

export const universalValidate = {
  paramId: <T>(BD: Array<T>, paramName: string) => param(paramName).custom(v => BD.filter(el => el.id === v).length > 0),
  bodyId: <T>(BD: Array<T>, paramName: string) => body(paramName).custom(v => BD.filter(el => el.id === v).length > 0).withMessage("not valid blogId")
};
