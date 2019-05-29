const database = require('../config/database');
const prettyResponse = require('../helpers/prettyRespose').pResify;
const dynamicQuery = require('../helpers/dynamicQuery');
const checkTableInjection = require('../helpers/injectionCheck').checkTableInjection;


module.exports = {
    getExames : async (req, res, next) => {
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

            // If the search is a get all exame
            if (primary == undefined){
                queryString = 'SELECT * FROM exame';
            }

            // If the search is more complex
            else{
                // Case Columns Y= Value X
                // Text columns get generic treatment
                if (primary !== 'data_do_exame' && primary !== 'hora_do_exame'){
                    queryString = `SELECT * FROM get_exame_text('${primary}', '${primaryValue}');`;
                }
                // Date columns get special treatment
                else{
                    if (primary === 'data_do_exame'){
                        beforeDate = req.query.beforeDate;
                        afterDate = req.query.afterDate;
                        if (afterDate === undefined){
                            afterDate = '01/01/1500';
                        }
                        if (beforeDate === undefined){
                            beforeDate =  '01/01/3000';
                        }
                        values = [afterDate, beforeDate];
                        queryString = "SELECT * FROM exame \
                        WHERE data_do_exame >= $1 AND data_do_exame <= $2;"
                    }

                    else if (primary === 'hora_do_exame'){
                        beforeTime = req.query.beforeTime;
                        afterTime = req.query.afterTime;
                        if (beforeTime === undefined){
                            beforeTime = '23:59';
                        }
                        if (afterTime === undefined){
                            afterTime =  '00:00';
                        }
                        values = [afterTime, beforeTime];
                        queryString = "SELECT * FROM exame \
                        WHERE hora_do_exame >= $1 AND hora_do_exame <= $2;"
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

                    if (primary !== 'data_do_exame' && primary !== 'hora_do_exame'){
                        secondQueryString = `SELECT ${table}.* 
                        FROM get_exame_text('${primary}', '${primaryValue}') NATURAL JOIN ${table};`;
                    }
                    else{
                        if (primary === 'data_do_exame' || primary === 'hora_do_exame'){
                            secondQueryString = ` SELECT ${table}.* FROM exame NATURAL JOIN ${table} 
                            WHERE exame.${primary} >= $1 AND exame.${primary} <= $2;`
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
            console.log(queryString, secondQueryString, values);
            throw(err);
        }
    },

    getExamePrimary : async (req, res, next) => {
        try{
            let primaryKey = req.params.primaryKey
            queryResult =  await dynamicQuery.getByPrimaryKey('exame', primaryKey);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },

    createExame : async (req, res, next) => {
        try{
            origin = req.body.origin
            values = Object.values(req.body.values);
            if (origin = 'consulta'){
                queryString = 'INSERT INTO exame(protocolo_exame,data_do_exame,hora_do_exame,tipo,cpf,crm,data_da_consulta) VALUES ($1,$2,$3,$4,$5,$6,$7)';
            }
            else if (origin = 'atendimento'){
                queryString = 'INSERT INTO exame(protocolo_exame,data_do_exame,hora_do_exame,tipo,protocolo_atendimento) VALUES ($1,$2,$3,$4,$5)';
            }
            else if (origin = 'internacao'){
                queryString = 'INSERT INTO exame(protocolo_exame,data_do_exame,hora_do_exame,tipo,protocolo_atendimento) VALUES ($1,$2,$3,$4,$5)';
            }
            else{
                throw err = {
                    errorMesssage : "Invalid origin!"
                }
            }
            queryResult = database.query(queryString, values);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },

    putExames : async (req, res, next) => {
        try{
            values = req.body.values
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    }
}
