const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
var cookieSession = require('cookie-session');
const routes = require('./routes');
require('./config/passport.config');
const port = 3000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieSession({
    name: 'session',
    keys: ['key1','key2']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(routes)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})