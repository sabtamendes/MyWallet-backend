import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import joi from "joi";

import { 
    getTransactions, 
    postSignIn, 
    postSignUp, 
    postSignOut, 
    postTransactions
} from "./controllers/user.controller.js";

const server = express();
dotenv.config();
server.use(cors());
server.use(express.json());

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


export const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required()
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export const transactionsSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("debit", "credit").required(),
    date: joi.string()
});

server.post("/sign-up", postSignUp);

server.post("/sign-in", postSignIn);

server.post("/sign-out", postSignOut);

server.get("/transactions", getTransactions);

server.post("/transactions", postTransactions);

server.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});