const express = require('express');
const bodyParser = require('body-parser')
var morgan = require('morgan')

const path = require('path');
const app = express();


const whitelist = require('./test_whitelist')
const db = require('./db');
const setConfig = require('./config')

let environment = process.env.NODE_ENV || 'development';
const config = setConfig(environment)

console.log("Database Config:" + JSON.stringify(config));




db.connect(config);

app.use(bodyParser.urlencoded({limit: "200mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: "200mb"}));

app.use(morgan('tiny'))



app.get('/ping', function (req, res) {
 return res.send('pong');
});


function checkUser(req, res, next){
  let user = req.header('cookie');
  console.log("User: " + user);
  if (whitelist.includes(user)){
    console.log("Authenticated User. Request Url: " + req.url);
    next();
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
} else {
    return res.send("Dear " + user + ", you to not have permission to access this application. Please seek authorization from Darth V.Iyer." )
}
    
}
// 





// app.use(checkUser);


const router = require('./routes');
app.use('/gwas/api', router)
app.use('/gwas',express.static(path.join(__dirname, 'build')))

app.listen(process.env.PORT || 8080);