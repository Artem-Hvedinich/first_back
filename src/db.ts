import {MongoClient, ObjectId} from "mongodb";

export type ProductType = {
    _id?: ObjectId,
    title: string
}

const url = "mongodb+srv://artem33771:GO7HvtWLipbGqKBs@cluster0.rc4lfsd.mongodb.net/first-back?retryWrites=true&w=majority"
console.log("url: ", url)
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
