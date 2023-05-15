import { db } from '../database/database.connection.js';
import dayjs from 'dayjs';

export async function listCustomers(req, res) {


    try {
        const customers = await db.query("SELECT * FROM customers");

        const customersFilter = customers.rows.map(customer => {
            return {...customer, birthday: dayjs(customer.birthday).format('YYYY-MM-DD')}
        });
        
        res.send(customersFilter);

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function findCustomer(req, res) {
    const { id } = req.params;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);

        if (customer.rows.length === 0) return res.status(404).send('Cliente não encontrado')

        const customersFilter = customer.rows.map(customer => {
            return {...customer, birthday: dayjs(customer.birthday).format('YYYY-MM-DD')}
        });

        res.send(customersFilter[0])
    } catch (error) {
        res.send(error.message)
    }
}


export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    if (!name || name.trim().length === 0 || !phone || !/^\d{10,11}$/.test(phone) || !cpf || !/^\d{11}$/.test(cpf) || !birthday || 
    isNaN(Date.parse(birthday))) {
        return res.status(400).send();
    }

    const customer = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);

    if (customer.rows.length != 0) return res.status(409).send('CPF já cadastrado')


    // Inserir o novo cliente no banco de dados
    db.query(`INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')`)
    
    return res.status(201).send('ok');
}

export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);

        if (customer.rows.length === 0) return res.status(409).send('Cliente não encontrado')

        db.query(`UPDATE customers SET name='${name}', phone='${phone}',birthday='${birthday}' WHERE id=$1;`, [id])

        const cpfConsult = await db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);

        if (cpfConsult.rows.length != 0) return res.status(409).send('Este CPF ja está cadastrado')

        db.query(`UPDATE customers SET cpf='${cpf}' WHERE id=$1;`, [id])

        return res.status(200).send('ok!')

    } catch (err) {
        res.send(err.message)
    }
}