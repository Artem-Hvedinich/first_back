import {Request, Response, Router} from "express";
import {productsRepository} from "../repository/products-repository";

export const productsRouter = Router()
productsRouter.get('/', async (req: Request, res: Response) => {
    const products = await productsRepository.getProducts()
    res.send(products)
})

productsRouter.post('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const newProduct = await productsRepository.createProduct(req.body.title)
    newProduct ? res.status(201).send(newProduct) : res.send(404)
})
