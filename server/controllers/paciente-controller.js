const database = require('../config/database');
const prettyResponse = require('../helpers/prettyRespose').pResify;
const dynamicQuery = require('../helpers/dynamicQuery');
const injectionCheck = require('../helpers/injectionCheck').checkTableInjection;


module.exports = {
    getAllPacientes : async (req, res, next) => {
        try{
            primary = req.body.primary;
            primaryValue = req.body.primaryValue;
            secondary = req.body.secondary;
            values = [];
            primaryQueryResult = [];
            secondQueryResult = [];
            queryString = "";


            if (secondary != undefined){
                secondaryLenght = Object.keys(secondary).length;
            }
            else{
                secondaryLenght = 0;
            }

            if (primary == undefined){
                queryString = 'SELECT * FROM paciente';
            }

            else{
                // Case Y=X
                if (primary !== 'data_de_nascimento'){
                    queryString = `SELECT * FROM get_paciente_text('${primary}', '${primaryValue}');`;
                }
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

            console.log(queryString);
            primaryQueryResult = await database.query(queryString, values);

            // Caso seja uma busca relacional
            if (secondaryLenght != 0){
                secondQueryResult = [];
                for (let i = 0; i< secondaryLenght; i++){
                    table = secondary[i]
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
                    console.log(secondQueryString);
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
    },

    createPaciente : async (req, res, next) => {
        //TODO When there is real data
        try{
            values = req.body.values
            queryString = 'INSERT INTO paciente VALUES ($1,$2,$3,$4)';
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