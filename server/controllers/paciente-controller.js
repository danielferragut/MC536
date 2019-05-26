const database = require('../config/database');
const prettyResponse = require('../helpers/prettyRespose').pResify;
const dynamicQuery = require('../helpers/dynamicQuery');
const injectionCheck = require('../helpers/injectionCheck').checkTableInjection;


module.exports = {
    getPacientes : async (req, res, next) => {
        try{
            primary = req.body.primary;
            primaryValue = req.body.primaryValue;
            secondary = req.body.secondary;
            values = [];
            primaryQueryResult = [];
            secondQueryResult = [];
            queryString = "";

            //Secondary lenght has the lenght of the secondary Array/Object
            if (secondary != undefined){
                secondaryLenght = Object.keys(secondary).length;
            }
            else{
                secondaryLenght = 0;
            }

            // If the search is a get all paciente
            if (primary == undefined){
                queryString = 'SELECT * FROM paciente';
            }

            // If the search is more complex
            else{
                // Case Columns Y= Value X
                // Text columns get generic treatment
                if (primary !== 'data_de_nascimento'){
                    queryString = `SELECT * FROM get_paciente_text('${primary}', '${primaryValue}');`;
                }
                // Date columns get special treatment (Age query)
                else{
                    beforeDate = primaryValue[0];
                    afterDate = primaryValue[1];
                    if (beforeDate === null){
                        beforeDate = 0;
                    }
                    if (afterDate === null){
                        afterDate = 999;
                    }
                    values = [beforeDate, afterDate];
                    queryString = "SELECT p.* FROM paciente as p, \
                    EXTRACT(YEAR from age((now()::date), p.data_de_nascimento)) as idade \
                    WHERE idade >= $1 AND idade <= $2; \
                    "
                }
            }

            // This request always returns a primary result
            primaryQueryResult = await database.query(queryString, values);

            // In case of a relation search with Y and X.
            if (secondaryLenght != 0){
                secondQueryResult = [];

                //For every table in my relational tables array
                for (let i = 0; i< secondaryLenght; i++){
                    table = secondary[i]

                    //Checks for SQL Injection on table variable, throws error if there is one
                    injectionCheck(table);

                    if (primary !== 'data_de_nascimento'){
                        secondQueryString = `SELECT entidade.* 
                        FROM get_paciente_text('${primary}', '${primaryValue}') as p, 
                        ${table} as entidade 
                        WHERE p.cpf = entidade.cpf;`;
                    }
                    else{
                        secondQueryString = `SELECT entidade.* 
                        FROM paciente as p, ${table} as entidade,
                        EXTRACT(YEAR from age((now()::date), p.data_de_nascimento)) as idade
                        WHERE (idade >= $1 AND idade <= $2) AND (entidade.cpf = p.cpf);
                        `
                    }
                    tempQueryResult = await database.query(secondQueryString, values);
                    result = {
                        tableName: table,
                        rows : tempQueryResult.rows
                    }
                    secondQueryResult.push(result);
                }
            }
            res.status(200).json(prettyResponse(primaryQueryResult.rows, secondQueryResult));
        }catch(err){
            if (err.errorMesssage = "SQL INJECTION ATTEMPT!"){
                res.sendStatus(400);
            }
            else{
                res.sendStatus(500);
            }
            console.log(err);
        }
    },

    getPacientePrimary : async (req, res, next) => {
        try{
            let cpf = req.params.cpf
            queryResult =  await dynamicQuery.getByPrimaryKey('paciente', cpf);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },

    //TODO : When there is real data
    createPaciente : async (req, res, next) => {
        try{
            values = req.body.values
            queryString = 'INSERT INTO paciente VALUES ($1,$2,$3,$4)';
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },
    putPaciente : async (req, res, next) => {
        try{
            values = req.body.values
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
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