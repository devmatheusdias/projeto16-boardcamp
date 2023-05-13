import joi from "joi";

export const gamesSchema = joi.object({
   name: joi.string().min(5).required(),
   image: joi.string(),
   stockTotal: joi.number().greater(0),
   pricePerDay: joi.number().greater(0),
});