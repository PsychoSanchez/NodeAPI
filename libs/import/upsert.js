
/**
 * Creates or updates row
 * 
 * @param {Object} Model Model to update or create 
 * @param {Object} values Model values 
 * @param {Object} condition Where condition 
 */
module.exports = function upsert(Model, values, condition) {
    return Model
        .findOne({where: condition})
        .then(function(obj) {
            if (!obj) {
                return Model.create(values);
            } else {
                return Promise.resolve(obj);
            }
        });
};