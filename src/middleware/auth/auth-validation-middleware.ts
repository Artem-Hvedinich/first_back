import "dotenv/config";
import { header } from "express-validator";

export const authValidate = {
  authorization: header("authorization")
    .custom(v => v.includes("Basic ") && atob(v.slice(6)) === process.env.USER_NAME + ":" + process.env.PASSWORD)
};
