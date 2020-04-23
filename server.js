const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const whitelist = require('./whitelist')
const router = require('./routes');
const db = require('./db');
const config = require('./config')



db.connect(config);

app.get('/ping', function (req, res) {
 return res.send('pong');
});


function checkUser(req, res, next){
  let user = req.header('X-Forwarded-User');
  if (whitelist.includes(user)){
    next();
  } 
  else {
    return res.send("Dear " + user + ", you to not have permission to access this application. Please seek authorization from Darth V.Iyer." )
  }
}



app.use(checkUser);
app.use('/gwas',express.static(path.join(__dirname, 'build')))
app.use('/api', router)

app.listen(process.env.PORT || 8080);