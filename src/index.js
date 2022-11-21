import express from "express";
import cors from "cors";

import { 
    getTransactions, 
    postSignIn, 
    postSignUp, 
    postSignOut, 
    postCreditTransactions,
    postDebitTransactions
} from "./controllers/user.controller.js";

const server = express();
server.use(cors());
server.use(express.json());


server.post("/sign-up", postSignUp);

server.post("/sign-in", postSignIn);

server.post("/sign-out", postSignOut);

server.get("/transactions", getTransactions);

server.post("/credit", postCreditTransactions);

server.post("/debit", postDebitTransactions);

const port = process.env.PORT || 5000

server.listen(port , () => { console.log("Listening on port " + port ) });