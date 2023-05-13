import { Router } from "express";
import {validateSchema} from '../middlewares/validateSchema.middleware.js'
import { listGames, insertGame } from "../controllers/gamesController.js";
import { gamesSchema } from "../schemas/games.schema.js";

const gamesRouter = Router();

gamesRouter.get('/games', listGames)

gamesRouter.post('/games', validateSchema(gamesSchema), insertGame)


export default gamesRouter;