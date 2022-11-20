import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongo = new MongoClient(process.env.MONGO_URI);
let db;
export let users;
export let connection;
export let transactions;

mongo.connect().then(() => {
    db = mongo.db("mywallet");
    users = db.collection("users");
    connection = db.collection("connection");
    transactions = db.collection("transactions");
});