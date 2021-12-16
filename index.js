const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
var cookieSession = require('cookie-session');
const port = 3000;
require('./passport.config');

app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieSession({
    name: 'session',
    keys: ['key1','key2']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello Latreta!')
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/success');
});

app.get('/failed', function(req,res){
    res.sendStatus("Falha ao logar");
});

app.get('/success', function(req,res){
  const { displayName, _json } = req.user;
    res.send(req.user);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})