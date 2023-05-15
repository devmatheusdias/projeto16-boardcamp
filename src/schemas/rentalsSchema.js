import joi from "joi";

export const reantalsSchema = joi.object({
    customerId: joi.required(),
    gameId: joi.required(),
    daysRented: joi.number().greater(0).required()
});