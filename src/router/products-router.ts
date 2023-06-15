import {Request, Response, Router} from "express";

const products = [{id: 0, isActive: true}, {id: 1, isActive: true},]

export const ProductsRouter = Router()
ProductsRouter.get('/', (req: Request, res: Response) => {
    res.send(products)
})
