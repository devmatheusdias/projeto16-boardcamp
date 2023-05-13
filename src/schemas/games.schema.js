import joi from "joi";

export const gamesSchema = joi.object({
   name: joi.string().min(3).required(),
   image: joi.string(),
   stockTotal: joi.number().greater(0),
   pricePerDay: joi.number().greater(0),
});