import joi from "joi";

export const customersSchema = joi.object({
   name: joi.string().min(3).required(),
   phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).optional(),
   cpf: joi.string().length(11).pattern(/^[0-9]+$/),
   birthday: joi.date().greater('1-1-1903')
});