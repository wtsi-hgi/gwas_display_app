



let setConfig = (environment) => {

    let host = environment == "production"? "gwas-db":"localhost";

    const config = {
        host: host,
        port: 27017,
        dbName: "gwasdb"
    }
    console.log("Config: " + JSON.stringify(config));
    return config;
}


module.exports = setConfig;