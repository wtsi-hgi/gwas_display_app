const Mongoose = require('mongoose');
var util = require('util')

var _db;


 async function connect(config){
    
    let host = config.host;
    let port = config.port;
    let dbName = config.dbName;

    let uri = "mongodb://" + host + ":" + port + "/" + dbName;

    let callback = (error, Mongoose) => {
        if (error){
            throw error;
        }
        console.log("Connection to Mongodb established")
       _db = Mongoose.connection.db;
    }
    Mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, callback)
}



async function get(){
    if (_db){
        console.log("Return db")
        return _db
    } else {
        const config = require('./config');
        console.log("calling connect on db")
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


