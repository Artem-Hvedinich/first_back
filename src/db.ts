import {MongoClient, ObjectId} from "mongodb";
import * as dotenv from "dotenv"

dotenv.config()
export type ProductType = {
    _id?: ObjectId,
    title: string
}

const url: string = process.env.MONGO_URI || "http://localhost:8080"
console.log("url: ", url)
!url && console.log("url not found")
const client = new MongoClient(url)

export const productCollections = client.db().collection<ProductType>("products")

export const runDB = async () => {
    try {
        await client.connect()
        console.log("Connect successfully to server")
    } catch (e) {
        console.log("Don't Connect successfully to server")
        await client.close()
    }
}
