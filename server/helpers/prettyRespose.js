module.exports = {
    pResify : (primary = [], secondary = []) => {
        try{
            let template = {
                records : {
                    primary : [],
                    secondary: []
                }
            };
            template.records.primary = primary;
            template.records.secondary = secondary;
            return template;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

}