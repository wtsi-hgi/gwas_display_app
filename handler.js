
const Db = require('./db')
const model = require('./model')
// model.

const getPhenotypes = (req, res) => {
 
    (async () => {
        let collection = "phenotypes";
        let queryParams =   {};
        const db = await Db.get();
        phenotypes = await db.collection(collection).find(queryParams).toArray(); 

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


const dropCollection = (req, res) => {

   const datatype = req.params.datatype;
   // console.log(jsonData);
   (async () => {
    const db = await Db.get()

    let Collection = db.collection(datatype)
    const response = await Collection.drop()
    return response
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
    // let Collection = model[datatype]
    // try {
    //     await Collection.drop()
    // }
    // catch (error){
    //     console.log("Error while fetching collection: " + error);
    // }

    // let cb = function(err,result) {
    //     if (result.hasWriteErrors()) {
    //       // Log something just for the sake of it
    //       console.log('Has Write Errors:');
    //       log(result.getWriteErrors());

    //       // Check to see if something else other than a duplicate key, then throw
    //       if (result.getWriteErrors().some( error => error.code != 11000 ))
    //         throw err;
    //     }
    // }


    console.log("jsonData " , jsonData)
    const response = await Collection.insertMany(jsonData, { ordered: false })
    return response
   })()
   .then(response => {
        console.log("Upload Response: ", response); 
        res.status(200).json(response); 
    })
   .catch(error => {
        if (error.code == 11000){
            console.log("Error: ", error)
            // let wErrors = error.getWriteErrors()
            // for (error in wErrors){
            //     console.log("this: ", error)
            // }
            res.status(200).json("The file contained  duplicate entries. Non-duplicate entries have been inserted. " + "Inserted: " + error.result.nInserted + " Error: " + error.result.getWriteErrors()[0].errmsg );
        } else {
            res.status(500).json(error);
        }
    });
}
   




module.exports = {
    getPhenotypes,
    getVariant,
    uploadFile,
    dropCollection
}

