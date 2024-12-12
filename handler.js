import Db from "./db/connection.js";

async function Get(req, res) {
    try{
        const response = await Db.query('SELECT * FROM Sys');
        res.json({data:response, message: "ini response dari get"});
    }catch(error){
        res.status(404).json({message: `err ${error}`});
    }
};

export {Get};