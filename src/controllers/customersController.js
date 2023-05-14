import { db } from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function listCustomers(req, res) {
    try {
        const customers = await db.query("SELECT * FROM customers");
        res.send(customers.rows);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function findCustomer(req, res) {
    const { id } = req.params;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);

        if (customer.rows.length === 0) return res.status(404).send('Cliente não encontrado')

        res.send(customer.rows[0])
    } catch (error) {
        res.send(error.message)
    }
}


export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    const dateBirthday = dayjs(birthday).format('DD/MM/YYYY');

    // 
    try {

        const customer = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);

        if (customer.rows.length != 0) return res.status(409).send('Este CPF ja está cadastrado')

        db.query(
            `INSERT INTO customers (name, phone, cpf, birthday)
             VALUES ('${name}', '${phone}', '${cpf}', '${dateBirthday}')`,
        )

        return res.status(201).send('ok!')

    } catch (err) {
        res.send(err.message)
    }
}

export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const {id} = req.params;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);

        if (customer.rows.length === 0) return res.status(409).send('Cliente não encontrado')

        db.query(`UPDATE customers SET name='${name}', phone='${phone}',birthday='${birthday}' WHERE id=$1;`, [id])

        const cpfConsult = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);

        if (cpfConsult.rows.length != 0) return res.status(409).send('Este CPF ja está cadastrado')

        db.query(`UPDATE customers SET cpf='${cpf}' WHERE id=$1;`, [id])

        return res.status(200).send(cpfConsult.rows[0].cpf)
    } catch (err) {
        res.send(err.message)
    }
}