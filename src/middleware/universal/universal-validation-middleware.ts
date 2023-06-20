import { param } from "express-validator";

export const universalValidate = {
  id: <T>(BD: Array<T>) => param("id").custom(v => BD.filter(el => el.id === v).length > 0)
};
