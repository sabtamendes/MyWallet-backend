import { signUpSchema, signInSchema } from "../schemas/userSchema.js";
import { transactionsSchema } from "../schemas/transactionSchema.js";
import { users, connection, transactions } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function postSignUp(req, res) {
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
        res.sendStatus(500);
    }
}
export async function postSignIn(req, res) {
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

        const isInAsession = await connection.findOne({ userId: token });

        if (isInAsession) {
            return res.status(401).send({ message: "Sua conta já está logada, tente novamente!" });
        }
        await transactions.updateOne({ token: token }, { $set: { userId: userHasAnAccount._id } });


        await connection.insertOne({ token, userId: userHasAnAccount._id });

        res.status(201).send({ name: userHasAnAccount.name, token });

    } catch (error) {
        res.sendStatus(500);
    }
}
export async function deleteSignOut(req, res) {
    const { authorization } = req.headers;
console.log(req.headers)
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const userConnection = await connection.findOne({ token });


        const user = await connection.findOne({ userId: userConnection?.userId });

        if (!user) {
            return res.sendStatus(401);
        }

        await connection.deleteOne({ token: userConnection.token, userId: userConnection._id });

        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
}
export async function getTransactions(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const userConnection = await connection.findOne({ token });


        const user = await connection.findOne({ userId: userConnection?.userId });

        if (!user) {
            return res.sendStatus(401);
        }

        delete user.password;
        delete user.confirmPassword;

        const allTransactions = await transactions.find({ userId: userConnection?.userId }).toArray();

        res.send(allTransactions);

    } catch (error) {
        res.sendStatus(500);
    }
}
export async function postCreditTransactions(req, res) {
    const { authorization } = req.headers;
    const data = req.body;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    const { error } = transactionsSchema.validate(data, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(401).send(errors);
    }

    try {
        const result = await connection.findOne({ token });

        if (!result) {
            return res.sendStatus(401);
        }

        const addNewTransactions = {
            token: token,
            userId: result.userId,
            value: data.value,
            description: data.description,
            type: data.type,
            date: dayjs().format("DD/MM")
        };
        await transactions.insertOne(addNewTransactions);

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}
export async function postDebitTransactions(req, res) {
    const { authorization } = req.headers;
    const data = req.body;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    const { error } = transactionsSchema.validate(data, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(401).send(errors);
    }

    try {
        const result = await connection.findOne({ token });

        if (!result) {
            return res.sendStatus(401);
        }

        const addNewTransactions = {
            token: token,
            userId: result.userId,
            value: data.value,
            description: data.description,
            type: data.type,
            date: dayjs().format("DD/MM")
        };
        await transactions.insertOne(addNewTransactions);

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}
export async function postSignOut(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }
    try {
        await connection.deleteOne({ token });
        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(500);
    }
}