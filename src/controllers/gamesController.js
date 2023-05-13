import { db } from '../database/database.connection.js'


export async function listGames(req, res) {
    try {
        const games = await db.query("SELECT * FROM games");
        res.send(games.rows);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function insertGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    
    try {
        const games = await db.query("SELECT (name) FROM games");

        const gameExist = games.rows.find(game => game.name === name)

        if(gameExist) return res.status(409).send('Este jogo já existe');

        db.query(
            `INSERT INTO games (name, image, "stockTotal", "pricePerDay")
             VALUES ('${name}', '${image}', '${stockTotal}', '${pricePerDay}')`, 
        )

        return res.status(201).send('ok!')

    } catch (err) {
        res.send(err.message)
    }
}