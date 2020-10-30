const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
Mongoose.set('useCreateIndex', true)



const phenotypeSchema = new Schema({
    id: {type: Number},
    project: {type: String},
    category: {type: String},
    name: {type: String, unique: true, required: true, index: true},
    qqplot: {type: String},
    manhattan: {type: String}
}, { collection : 'phenotypes' });



const variantSchema = new Schema({
        
        "locus": {type: String},
        "rsid": {type: String},
        "REF": {type: String},
        "ALT": {type: String},
        "n": {type: Number},
        "AF": {type: Number},
        "beta":{type: Number},
        "se": {type: Number},
        "p":{type: Number},
        "phenotype": {type: String},
        "locus_REF_ALT_phenotype": {type: String, unique: true, required: true},
    }, {collection: "variants"});






let phenotypes = Mongoose.model('phenotypes', phenotypeSchema);
let variants = Mongoose.model('variants', variantSchema);



module.exports = {
    phenotypes, 
    variants
}


// ```