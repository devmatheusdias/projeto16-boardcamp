import { Router } from "express";
// import {validateSchema} from '../middlewares/validateSchema.middleware.js'
import { listRentals, insertRentals, finalizeRentals, deleteRentals } from "../controllers/rentalsController.js";
// import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', listRentals);

rentalsRouter.post('/rentals', insertRentals);

rentalsRouter.post('/rentals/:id/return', finalizeRentals);

rentalsRouter.delete('/rentals/:id', deleteRentals);

export default rentalsRouter;