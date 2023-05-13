import {db} from '../database/database.connection.js';
import cpfValidation from 'node-cpf'

export async function listCustomers(req, res){
    try {
        const customers = await db.query("SELECT * FROM customers");
        res.send(customers.rows);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function findCustomer(req,res){
    try{
        res.send('ok')
    }catch(err){
        res.send(console.log(err.message))
    }
}


export async function insertCustomer(req, res){
    const { name, phone, cpf, birthday } = req.body;

    // 
    try {
        const customers = await db.query("SELECT (cpf) FROM customers");

        const customerExists = customers.rows.find(customer => customer.cpf === cpf)

        if(customerExists) return res.status(409).send('Este CPF ja esta cadastrado');

        db.query(
            `INSERT INTO customers (name, phone, cpf, birthday)
             VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')`, 
        )

        return res.status(201).send('ok!')

    } catch (err) {
        res.send(err.message)
    }
}

export async function updateCustomer(req,res){
    try{
        res.send('ok')
    }catch(err){
        res.send(console.log(err.message))
    }
}