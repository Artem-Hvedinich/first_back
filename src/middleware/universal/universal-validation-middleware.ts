import { body, param } from "express-validator";
import { blogsDB } from "../../repository/blogs/blogs-repository";

export const universalValidate = {
  paramId: <T>(BD: Array<T>) => param("id").custom(v => BD.filter(el => {
    console.log(el, v);
    return el.id === v;
  }).length > 0),
  blogId: param("id").custom(v => blogsDB.filter(el => {
    console.log(el, v);
    return el.id === v;
  }).length > 0),
  bodyId: <T>(BD: Array<T>, paramName: string) => body(paramName).custom(v => BD.filter(el => el.id === v).length > 0).withMessage("not valid blogId")
};
