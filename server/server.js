const express = require('express');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const key = require('../secrets.js')
const socketio = require('socket.io');
const db = require('./db/dbsetup.js');
const apiRouter = require('./routes/apiRouter');
const accountRouter = require('./routes/accountRouter');
const bodyParser = require('body-parser');
const sequelizeStore = require('connect-session-sequelize')(session.Store)

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var sessionMware = session({
    secret: 'somereallylong(*DHF$^!@?asdf;,F6^',
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
        maxAge: 1000*60*60*24*7
    },
    store: new sequelizeStore({
        db: db
    })
})
app.use(sessionMware);

app.use(function(req, res, next) {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        let token = authHeader.split(" ")[1];
        jwt.verify(token, key.tokenKey, function(err, payload){
            
        })
    }
    next();
})

app.use(express.static(path.join(__dirname, '..', '/public')))
app.use('/api', apiRouter);
app.use('/account', accountRouter);
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

db.sync({force:false});
const server = app.listen(port, () => console.log('Server Running'));

const io = socketio(server);
require('../socket/socket.js')(io);
io.use(function(socket, next){
    sessionMware(socket.request, socket.request.res, next)
})