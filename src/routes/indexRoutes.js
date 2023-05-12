import { Router } from "express";
import costumersRouter from "./costumers.routes.js";
import gamesRouter from "./games.routes.js";
import rentalsRouter from "./rentals.routes.js";

const routes = Router();
routes.use(gamesRouter, costumersRouter, rentalsRouter);

export default routes;
