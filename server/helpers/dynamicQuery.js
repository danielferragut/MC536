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
                    return null;
            }
            values = [primaryKeyValue];
            queryString = 'SELECT * FROM ' + table + ' WHERE ' + primaryKey + ' = $1'
            console.log(queryString);
            result = await database.query(queryString, values);
            return result;
        }catch(err){
            throw err;
        }

    }
}