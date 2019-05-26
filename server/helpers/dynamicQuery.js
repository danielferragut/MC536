const database = require('../config/database');

module.exports = {
    getByPrimaryKey : async (table, primaryKeyValue) => {
        let primaryKey;
        try{
            switch(table){
                case 'paciente':
                    primaryKey = 'cpf';
                    break;
                case 'médico':
                    primaryKey = 'crm';
                    break;
                case 'exame':
                    primaryKey = 'protocolo_exame';
                    break; 
                case 'consulta':
                    break;
                case 'pronto_socorro':
                    primaryKey = 'protocolo_atendimento';
                    break; 
                case 'cirurgia':
                    primaryKey = 'protocolo_cirurgia';
                    break; 
                case 'internação':
                    primaryKey = 'protocolo_internacao';
                    break;
                default:
                    //TODO : Maybe throw a error?
                    return null;
            }
            values = [primaryKeyValue];
            queryString = 'SELECT * FROM ' + table + ' WHERE ' + primaryKey + ' = $1'
            result = await database.query(queryString, values);
            return result;
        }catch(err){
            throw err;
        }
        
    },
}

// CREATE OR REPLACE FUNCTION get_paciente(p_column TEXT, p_value TEXT)
//   RETURNS SETOF paciente LANGUAGE plpgsql AS
// $func$
// DECLARE
//     query TEXT := 'SELECT * FROM paciente';
// BEGIN
//     IF p_column IS NOT NULL THEN
//         query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
//     END IF;
//     RETURN QUERY EXECUTE query
//     USING p_value;
// END;
// $func$;

// SELECT * FROM get_paciente('cpf', '1');