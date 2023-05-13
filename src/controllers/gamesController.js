
// import {db} from '../database/database.js'


export async function listGames(req, res){ 
    res.send('ok');
}

export async function insertGame(req,res){
   const {name, image, stockTotal, pricePerDay} = req.body;

   try {
        res.send(`name: ${name} | image: ${image} | stockTotal: ${stockTotal} | pricePerDay: ${pricePerDay}`)
   } catch (err) {
        res.send(err.message)
   }
}