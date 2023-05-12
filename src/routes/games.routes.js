import { Router } from "express";
// import {validateSchema} from '../middlewares/validateSchema.middleware.js'
import { listGames, insertGame } from "../controllers/gamesController.js";
// import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const gamesRouter = Router();

gamesRouter.get('/games', listGames)

gamesRouter.post('/games', insertGame)


export default gamesRouter;