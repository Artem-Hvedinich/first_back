import express, {Request, Response} from "express"
import cors from "cors"
import {ProductsRouter} from "./router/products-router";

const app = express()
const allowedOrigins = ['https://127.0.0.1:5173/'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options))
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
const port = 8080

app.use('/product', ProductsRouter)
app.get('/', (req: Request, res: Response) => res.send("First Back"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
