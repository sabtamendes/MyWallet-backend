import joi from "joi";

export const transactionsSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("debit", "credit").required(),
    date: joi.string()
});