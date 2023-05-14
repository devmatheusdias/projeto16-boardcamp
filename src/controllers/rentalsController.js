import {db} from '../database/database.connection.js'


export async function listRentals(req, res){
    // try {
    //     const rentals = await db.query("SELECT * FROM rentals");
    //     res.send(rentals.rows);
    // } catch (err) {
    //     res.status(500).send(err.message)
    // }
}

export async function insertRentals(req,res){
    const { name, phone, cpf, birthday } = req.body;

    const dateBirthday = dayjs(birthday).format('DD/MM/YYYY');

    // 
    try {
        const customers = await db.query("SELECT (cpf) FROM customers");

        const customerExists = customers.rows.find(customer => customer.cpf === cpf)

        if(customerExists) return res.status(409).send('Este CPF ja esta cadastrado');

        db.query(
            `INSERT INTO customers (name, phone, cpf, birthday)
             VALUES ('${name}', '${phone}', '${cpf}', '${dateBirthday}')`, 
        )

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
    try{
        res.send('ok')
    }catch(err){
        res.send(console.log(err.message))
    }
}