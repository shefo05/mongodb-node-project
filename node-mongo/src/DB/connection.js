import { MongoClient } from "mongodb";

const { log } = console;
const client = new MongoClient("mongodb://127.0.0.1:27017/");

function connectDB() {
    client.connect().then(() => {
        log('db connected successfully')
    }).catch(() => {
        log("fail to connect to DB")
    })
}

const db = client.db("library-node")

export {connectDB , db}