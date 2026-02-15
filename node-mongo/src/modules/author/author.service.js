import { db } from "../../DB/connection.js";

export const createCollectionImplicit = async(doc) => {
    return await db.collection('author').insertOne(doc)
}