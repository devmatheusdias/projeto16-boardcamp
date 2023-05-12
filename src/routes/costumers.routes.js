import { Router } from "express";
// import {validateSchema} from '../middlewares/validateSchema.middleware.js'
import {listCostumer, findCostumer, insertCostumer,  updateCostumer} from "../controllers/costumersController.js"
// import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const costumersRouter = Router();

costumersRouter.get('/costumers', listCostumer);

costumersRouter.get('/costumers/:id', findCostumer);

costumersRouter.post('/costumers', insertCostumer);

costumersRouter.put('/costumers/:id', updateCostumer);

export default costumersRouter;