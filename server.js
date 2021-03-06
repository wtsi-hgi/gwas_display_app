const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


const whitelist = require('./whitelist')
const db = require('./db');
const router = require('./routes');
const setConfig = require('./config')

let environment = process.env.NODE_ENV || 'development';
const config = setConfig(environment);
db.connect(config);


app.get('/ping', function (req, res) {
 return res.send('pong');
});


/**

**/

function checkUser(req, res, next){
  let user = req.header('X-Forwarded-User');
  if (whitelist.includes(user)){
    next();
  } 
  else {
    return res.send("Dear " + user + ", you to not have permission to access this application. Please seek authorization from Darth V.Iyer." )
  }
}


app.use(bodyParser.json({limit: '500mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}))
// app.use(checkUser);

app.use('/gwas',express.static(path.join(__dirname, 'build')))
app.use('/gwas/api', router)

app.listen(process.env.PORT || 8080);