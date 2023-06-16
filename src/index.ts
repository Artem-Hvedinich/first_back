import express, {Request, Response} from "express"
import {productsRouter} from "./router/products-router";
import {runDB} from "./db";

const app = express()
const port = 8080

const parserMiddleware = express.json()
app.use(parserMiddleware)
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.get('/', (req: Request, res: Response) => res.send("First Back"))
app.use('/product', productsRouter)
const startApp = async () => {
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()
