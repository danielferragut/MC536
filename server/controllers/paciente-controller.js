const database = require('../config/database');
const prettyResponse = require('../helpers/prettyRespose').pResify;
const dynamicQuery = require('../helpers/dynamicQuery');
const injectionCheck = require('../helpers/injectionCheck').checkTableInjection;


module.exports = {
    getPacientes : async (req, res, next) => {
        try{
            primary = req.query.primary;
            primaryValue = req.query.primaryValue;
            secondary = req.query.secondary;

            values = [];
            primaryQueryResult = [];
            secondQueryResult = [];
            queryString = "";
            //Secondary lenght has the lenght of the secondary Array/Object
            if (secondary != undefined){
                if (! Array.isArray(secondary)){
                    secondary = [secondary];
                }
                secondaryLenght = secondary.length;

            }
            else{
                secondary = []
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
                    beforeDate = req.query.minAge;
                    afterDate = req.query.maxAge;
                    if (beforeDate == undefined){
                        beforeDate = 0;
                    }
                    if (afterDate === undefined){
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

    createPaciente : async (req, res, next) => {
        try{
            bodyObject = req.body
            values = Object.values(bodyObject);
            if (values.length == 6){
                values.push(null)
                values.push(null)
            }
            else if (values.length == 7){
                values.push(null)
            }
            queryString = 'INSERT INTO paciente VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
            queryResult = database.query(queryString, values);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },
    putPaciente : async (req, res, next) => {
        try{
            values = req.body
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