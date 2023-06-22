import { Request, Response, Router } from "express";
import { productsRepository } from "../repository/products-in-memory-repository";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middleware/input-validation-middleware";

export const productsRouter = Router();

const titleValidation = body("title").trim().isLength({
  min: 3,
  max: 30
}).withMessage("Title length should be from 3 to 10 symbols ");

productsRouter.get("/", async (req: Request, res: Response) => {
    const products = await productsRepository.getProducts();
    res.send(products);
  }
);
productsRouter.post("/",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newProduct = await productsRepository.createProduct(req.body.title);
    newProduct ? res.status(201).send(newProduct) : res.sendStatus(404);
  });

