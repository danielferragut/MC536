const database = require('../config/database');
const prettyResponse = require('../helpers/prettyRespose').pResify;
const dynamicQuery = require('../helpers/dynamicQuery');


module.exports = {
    getAllPacientes : async (req, res, next) => {
        try{
            queryResult = await database.query("SELECT * FROM paciente");
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            console.log(err);
            throw err
        }
    },

    getPaciente : async (req, res, next) => {
        try{
            let cpf = req.params.cpf
            queryResult =  await dynamicQuery.getByPrimaryKey('paciente', cpf);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            console.log(err);
            throw err
        }
    }
}

// getPacientes : async (req, res, next) => {
//     try{
//     }catch(err){
//         console.log(err);
//         throw err
//     }
// }