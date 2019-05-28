const database = require('../config/database');
const prettyResponse = require('../helpers/prettyRespose').pResify;
const dynamicQuery = require('../helpers/dynamicQuery');
const checkTableInjection = require('../helpers/injectionCheck').checkTableInjection;


module.exports = {
    getConsultas : async (req, res, next) => {
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

            // If the search is a get all consulta
            if (primary == undefined){
                queryString = 'SELECT * FROM consulta';
            }

            // CREATE TABLE consulta(
            //     PRIMARY KEY(crm, cpf, data_da_consulta)
            // );

            // If the search is more complex
            else{
                // Case Columns Y= Value X
                // Text columns get generic treatment
                if (primary !== 'data_da_consulta' && primary !== 'hora_da_consulta'){
                    queryString = `SELECT * FROM get_consulta_text('${primary}', '${primaryValue}');`;
                }
                // Date columns get special treatment
                else{
                    if (primary === 'data_da_consulta'){
                        beforeDate = req.query.beforeDate;
                        afterDate = req.query.afterDate;
                        if (afterDate === undefined){
                            afterDate = '01/01/1500';
                        }
                        if (beforeDate === undefined){
                            beforeDate =  '01/01/3000';
                        }
                        values = [afterDate, beforeDate];
                        queryString = "SELECT * FROM consulta \
                        WHERE data_da_consulta >= $1 AND data_da_consulta <= $2;"
                    }

                    else if (primary === 'hora_da_consulta'){
                        beforeTime = req.query.beforeTime;
                        afterTime = req.query.afterTime;
                        if (beforeTime === undefined){
                            beforeTime = '23:59';
                        }
                        if (afterTime === undefined){
                            afterTime =  '00:00';
                        }
                        values = [afterTime, beforeTime];
                        queryString = "SELECT * FROM consulta \
                        WHERE hora_da_consulta >= $1 AND hora_da_consulta <= $2;"
                    }
                }
            }

            // // This request always returns a primary result
            primaryQueryResult = await database.query(queryString, values);

            // In case of a relation search with Y and X.
            if (secondaryLenght != 0){
                secondQueryResult = [];

                //For every table in my relational tables array
                for (let i = 0; i< secondaryLenght; i++){
                    table = secondary[i]

                    //Checks for SQL Injection on table variable, throws error if there is one
                    checkTableInjection(table);

                    if (primary !== 'data_da_consulta' && primary !== 'hora_da_consulta'){
                        if (table == "medico"){
                            secondQueryString = `SELECT entidade.* 
                            FROM get_consulta_text('${primary}', '${primaryValue}') as m, 
                            ${table} as entidade 
                            WHERE m.crm = entidade.crm;`;
                        }else{
                            secondQueryString = `SELECT ${table}.* 
                            FROM get_consulta_text('${primary}', '${primaryValue}') NATURAL JOIN ${table};`;
                        }
                    }
                    else{
                        if (primary === 'data_da_consulta' || primary === 'hora_da_consulta'){
                            secondQueryString = ` SELECT ${table}.* FROM consulta NATURAL JOIN ${table} 
                            WHERE ${primary} >= $1 AND ${primary} <= $2;`
                        }
                        else{
                            throw err ={
                                errorMesssage : 'SQL INJECTION ATTEMPT!'
                            }
                        }
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
            if (err.errorMesssage === "SQL INJECTION ATTEMPT!"){
                res.sendStatus(400);
            }
            else{
                res.sendStatus(500);
            }
            throw(err);
        }
    },

    getConsultaPrimary : async (req, res, next) => {
        try{
            let crm = req.params.crm
            queryResult =  await dynamicQuery.getByPrimaryKey('consulta', crm);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },

    createConsulta : async (req, res, next) => {
        try{
            bodyObject = req.body
            values = Object.values(bodyObject);
            queryString = 'INSERT INTO consulta VALUES ($1,$2,$3,$4,$5,$6)';
            queryResult = database.query(queryString, values);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },
    
    putconsultas : async (req, res, next) => {
        try{
            values = req.body.values
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    }
}
