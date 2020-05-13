

// const MongoClient = require("mongodb").MongoClient;
const MongoClient = require('mongoose');


var _db;


 async function connect(config){
    
    let host = config.host;
    let port = config.port;
    let dbName = config.dbName;

    let uri = "mongodb://" + host + ":" + port + "/" + dbName;

    let callback = (error, connection) => {
        if (error){
            throw error;
        }
        console.log("Connection to Mongodb established")
       _db = connection.db;
       // _db = connection.db(dbName);
       // console.log("Db returned:" + _db);
    }
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, callback)
}



async function get(){
    if (_db){
        return _db
    } else {
        const config = require('./config');
        _db =  await connect(config);
        return _db
    }
    
}

async function close () {
  if (_db) {
    console.log('Closing MongoDB connection.')
    _db.close()
  }
}


module.exports = {
    connect,
    get,
    close
}


