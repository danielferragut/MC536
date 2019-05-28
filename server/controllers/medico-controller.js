const database = require('../config/database');
const prettyResponse = require('../helpers/prettyRespose').pResify;
const dynamicQuery = require('../helpers/dynamicQuery');
const checkTableInjection = require('../helpers/injectionCheck').checkTableInjection;


module.exports = {
    getMedicos : async (req, res, next) => {
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


            // If the search is a get all medico
            if (primary == undefined){
                queryString = 'SELECT * FROM medico';
            }

            // If the search is more complex
            else{
                // Case Columns Y= Value X
                // Text columns get generic treatment
                if (primary !== 'data_de_nascimento'){
                    queryString = `SELECT * FROM get_medico_text('${primary}', '${primaryValue}');`;
                }
                // Date columns get special treatment (Age query)
                else{
                    beforeDate = req.query.minAge
                    afterDate = req.query.maxAge
                    if (beforeDate === undefined){
                        beforeDate = 0;
                    }
                    if (afterDate === undefined){
                        afterDate = 999;
                    }
                    values = [beforeDate, afterDate];
                    queryString = "SELECT m.* FROM medico as m, \
                    EXTRACT(YEAR from age((now()::date), m.data_de_nascimento)) as idade \
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
                    checkTableInjection(table);

                    if (primary !== 'data_de_nascimento'){
                        secondQueryString = `SELECT entidade.* 
                        FROM get_medico_text('${primary}', '${primaryValue}') as m, 
                        ${table} as entidade 
                        WHERE m.crm = entidade.crm;`;
                    }
                    else{
                        secondQueryString = `SELECT entidade.* 
                        FROM medico as m, ${table} as entidade,
                        EXTRACT(YEAR from age((now()::date), m.data_de_nascimento)) as idade
                        WHERE (idade >= $1 AND idade <= $2) AND (entidade.crm = m.crm);
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
            res.sendStatus(500);
            // throw(err)
        }
    },

    getMedicoPrimary : async (req, res, next) => {
        try{
            let crm = req.params.crm
            queryResult =  await dynamicQuery.getByPrimaryKey('medico', crm);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },

    createMedico : async (req, res, next) => {
        try{
            bodyObject = req.body
            values = Object.values(bodyObject);
            queryString = 'INSERT INTO medico VALUES ($1,$2,$3,$4,$5)';
            queryResult = database.query(queryString, values);
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    },

    putMedicos : async (req, res, next) => {
        try{
            values = req.body.values
            res.status(200).json(prettyResponse(queryResult.rows));
        }catch(err){
            res.sendStatus(500);
            throw err
        }
    }
}
