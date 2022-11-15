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
let session;

mongo.connect().then(() => {
    db = mongo.db("mywallet");
    users = db.collection("users");
    session = db.collection("session");
});


const usersSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});


server.post("/sign-up", async (req, res) => {

    const user = req.body;

    try {
        const emailIsAllreadyInUse = await users.findOne({ email: user.email });

        if (emailIsAllreadyInUse) {
            return res.status(409).send({ message: "Email já está em uso!" });
        }

        const { error } = usersSchema.validate(user, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(401).send(errors);
        }

        const passwordHash = bcrypt.hashSync(user.password, 10);

        await info.insertOne({ ...user, password: passwordHash });

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error);
    }
});

server.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;

    const token = uuidV4();

    try {
        const userHasAnAccount = await users.findOne({ email });

        if (!userHasAnAccount) {
            return res.sendStatus(401);
        }

        const validPassword = bcrypt.compareSync(password, userHasAnAccount.password);

        if (!validPassword) {
            return res.sendStatus(401);
        }

        const isInAsession = await session.findOne({ userId: userHasAnAccount._id });

        if (isInAsession) {
            return res.status(401).send({ message: "Sua conta já está logada, tente novamente!" });
        }

        await session.insertOne({ token, userId: userHasAnAccount._id });

        res.send({ token });

    } catch (error) {
        res.status(500).send(error);
    }
});

server.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT)
});