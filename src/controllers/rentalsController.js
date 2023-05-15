import {db} from '../database/database.connection.js'
import dayjs from 'dayjs';


export async function listRentals(req, res){
    try {
        const rentals = await db.query("SELECT * FROM rentals");
        res.send(rentals.rows);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function insertRentals(req,res){
    const { customerId, gameId, daysRented } = req.body;

    // 
    try {

        const rentDate = dayjs(Date.now())

        const customers = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId]);
        const games = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId]);

        if (customers.rows.length === 0) return res.status(400).send('Cliente não encontrado')

        if (games.rows.length === 0) return res.status(400).send('Jogo não encontrado')

        db.query(`
            INSERT INTO rentals
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES
            ('${customerId}', '${gameId}', '${rentDate}', '${daysRented}', null, '${daysRented * games.rows[0].pricePerDay}', null)
        `)

        return res.status(201).send('ok!')

    } catch (err) {
        res.send(err.message)
    }
}

export async function finalizeRentals(req, res){
    try{
        res.send('ok')
    }catch(err){
        res.send(console.log(err.message))
    }
}

export async function deleteRentals(req,res){
    const {id} = req.params;

    try {
        const rentals = await db.query("SELECT * FROM rentals WHERE id=$1;", [id]);

        if(rentals.rows.length === 0) return res.status(404).send('Este alugel não existe')

        if(rentals.rows[0].returnDate != null) res.status(400).send('Aluguel finalizado')

        db.query(
            `DELETE FROM rentals WHERE id=$1;`,[id], 
        )

       return res.status(201).send('Aluguel deletado!')

    } catch (err) {
        res.send(err.message)
    }
}
