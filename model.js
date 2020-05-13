const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;




const phenotypeSchema = new Schema({

    id: {type: Number},
    project: {type: String},
    category: {type: String},
    name: {type: String, unique: true, required: true},
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
        "locus_REF_ALT_nmr_phenotypes": {type: String, unique: true, required: true},
    }, {collection: "variants"});






let phenotypes = Mongoose.model('phenotypes', phenotypeSchema);
let variants = Mongoose.model('Variant', variantSchema);



module.exports = {
    phenotypes, 
    variants
}


// ```