import { Router } from "express";
import customersRouter from "./customers.routes.js";
import gamesRouter from "./games.routes.js";
import rentalsRouter from "./rentals.routes.js";

const routes = Router();
routes.use(gamesRouter, customersRouter, rentalsRouter);

export default routes;
