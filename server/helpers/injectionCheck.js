module.exports = {
    checkTableInjection : (table) => {
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
                primaryKey = null;
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
                throw err = {
                    errorMessage : "SQL INJECTION ATTEMPT!"
                }
        }
    }
}