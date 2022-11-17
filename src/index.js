import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";


const server = express();
dotenv.config();
server.use(cors());
server.use(express.json());

const mongo = new MongoClient(process.env.MONGO_URI);
let db;
let users;
let connection;
let transactions;
mongo.connect().then(() => {
    db = mongo.db("mywallet");
    users = db.collection("users");
    connection = db.collection("connection");
    transactions = db.collection("transactions");
});


const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required()
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

server.post("/sign-up", async (req, res) => {

    const user = req.body;
    try {
        const emailIsAllreadyInUse = await users.findOne({ email: user.email });

        if (emailIsAllreadyInUse) {
            return res.status(409).send({ message: "Email já está em uso!" });
        }

        const { error } = signUpSchema.validate(user, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(401).send(errors);
        }

        const passwordHash = bcrypt.hashSync(user.password, 10);
        const confirmPasswordHash = bcrypt.hashSync(user.confirmPassword, 10);
        await users.insertOne({ ...user, password: passwordHash, confirmPassword: confirmPasswordHash });

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

server.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;

    const token = uuidV4();

    const { error } = signInSchema.validate({ email, password });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(401).send(errors);
    }

    try {
        const userHasAnAccount = await users.findOne({ email });

        if (!userHasAnAccount) {
            return res.status(401).send({ message: "Usuário não existe" });
        }

        const validPassword = bcrypt.compareSync(password, userHasAnAccount.password);

        if (!validPassword) {
            return res.sendStatus(401);
        }

        const isInAsession = await connection.findOne({ userId: userHasAnAccount._id });

        if (isInAsession) {
            return res.status(401).send({ message: "Sua conta já está logada, tente novamente!" });
        }

        await connection.insertOne({ token, userId: userHasAnAccount._id });

        res.send({ token });

    } catch (error) {
        res.status(500).send(error.message);
    }
});

server.post("/sign-out", async (req, res) => {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        await session.deleteOne({ token });
        res.sendStatus(200);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

server.get("/transactions", async (req, res) => {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const userConnection = await connection.findOne({ token });

        const user = await users.findOne({ _id: userConnection?.userId });

        if (!user) {
            return res.sendStatus(401);
        }

        delete user.password;

        const allTransactions = await transactions.find({}).toArray();

        res.send({ user, allTransactions });

    } catch (error) {
        res.status(500).send(error.message);
    }
});

server.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT)
});