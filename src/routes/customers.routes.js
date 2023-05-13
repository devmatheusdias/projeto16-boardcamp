import { Router } from "express";
import {validateSchema} from '../middlewares/validateSchema.middleware.js'
import { customersSchema } from "../schemas/customers.schema.js";
import {listCustomers, findCustomer, insertCustomer,  updateCustomer} from "../controllers/customersController.js"

const customersRouter = Router();

customersRouter.get('/customers', listCustomers);

customersRouter.get('/customers/:id', findCustomer);

customersRouter.post('/customers',  validateSchema(customersSchema), insertCustomer);

customersRouter.put('/customers/:id', updateCustomer);

export default customersRouter;