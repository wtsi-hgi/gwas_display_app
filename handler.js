
const Db = require('./db')


const getPhenotypes = (req, res) => {
 
    (async () => {
        let collection = "phenotypes";
        let queryParams =   {};
        const db = await Db.get()
        // console.log("Db inside:" + db);
        phenotypes = await db.collection(collection).find(queryParams).toArray(); 
        // console.log("phenotypes: " + JSON.stringify(phenotypes));
        return phenotypes;
    })()
    .then(data => {
        res.status(200).json({data:data});
    }).catch(err => {
        console.log("Error" + err);
        res.status(400).json({error: err});
    })
    
}



const getVariant= (req, res) => {
 
    (async () => {
        let collection = "variants";
        let queryParams = {phenotype: req.params.slug};
        const db = await Db.get();
        // console.log("Db inside:" + db);
        variants = await db.collection(collection).find(queryParams).toArray(); 
        // console.log("phenotypes: " + JSON.stringify(phenotypes));
        return variants;
    })()
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        console.log("Error" + err);
        res.status(400).json(err);
    })
    
}





module.exports = {
    getPhenotypes,
    getVariant
}

