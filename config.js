



let setConfig = (environment) => {

    let host = environment == "production"? "gwas-db":"localhost";

    const config = {
        host: host,
        port: 27017,
        dbName: "gwasdb"
    }
    
    return config;
}


module.exports = setConfig;