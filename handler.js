
const Db = require('./db')


const getPhenotypes = (req, res) => {
 
    (async () => {
        let collection = "phenotypes";
        let queryParams =   {};
        const db = await Db.get()
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

// IN CASE FILE UPLOAD IS NEEDED
// var multer = require('multer')
// var storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//       cb(null, 'data')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname )
//     }
// })


// var upload = multer({ storage: storage }).single('file')



// const uploadFile = (req, res) => {

//     upload(req, res, function (err) {
//            if (err instanceof multer.MulterError) {
//                return res.status(500).json(err)
//            } else if (err) {
//                return res.status(500).json(err)
//            }

//       //load file into memory and save it.     
//       return res.status(200).send(req.file)

//     })

// }

const uploadFile = (req, res) => {

   const jsonData = req.body;
   const datatype = req.params.datatype;
   // console.log(jsonData);
   (async () => {
    const db = await Db.get()
    let Collection = db.collection(datatype)
    await Collection.deleteMany({}).then(response => {console.log("Response" + response)});
    await Collection.insertMany(jsonData)
    .then(response => {
        console.log('saved to mongo db', response); 
        res.json(response);
    })
    .catch(error => {
        console.log('error in saving to mongo db', error); 
        res.json(error);
    })
   })();
}
   




module.exports = {
    getPhenotypes,
    getVariant,
    uploadFile
}

