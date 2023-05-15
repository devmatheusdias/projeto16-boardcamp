import { Router } from "express";
import {validateSchema} from '../middlewares/validateSchema.middleware.js'
import { listRentals, insertRentals, finalizeRentals, deleteRentals } from "../controllers/rentalsController.js";
import { reantalsSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', listRentals);

rentalsRouter.post('/rentals', validateSchema(reantalsSchema),insertRentals);

rentalsRouter.post('/rentals/:id/return', finalizeRentals);

rentalsRouter.delete('/rentals/:id', deleteRentals);

export default rentalsRouter;