const express = require('express');
const http = require('http')
const socketIo = require('socket.io');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const server = http.createServer(app);
const config = JSON.parse(fs.readFileSync("config.json"));

// SET CONSTANTS
const PORT = 8081;
global.appRoot = path.resolve(__dirname);
let mongo_final_ip = "";
console.log("Production? " + !process.env.DEBUG);
if(process.env.DEBUG){
    mongo_final_ip = "mongodb://" + config.mongo_ip_debug + "/dragonroll";
} else {
    mongo_final_ip = "mongodb://" + config.mongo_ip + "/dragonroll";
}
console.log("Db ip: " + mongo_final_ip)

// CONFIGURE SOCKET IO
const socket = require('./io/socket')
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});
socket.setIo(io);

// CONNECT TO MONGODB
mongoose.connect(mongo_final_ip).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});

// PASSPORT
app.use(morgan('tiny'));
app.use(passport.initialize());
require('./config/passport')(passport);

// PUBLIC
app.use("/public", express.static(__dirname + '/public'));
app.use('/public', express.static('uploads'));

// JSON LIMIT EXPRESS
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    extended : false,
    limit: '50mb'
}));

// CORS
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES (NO AUTH)
app.use('/user', require('./routes/user'));

// AUTH
checkAuth = passport.authenticate('jwt', {session: false});
app.use(checkAuth);

// ROUTES WITH AUTH
app.use('/campaign', require('./routes/campaign'));
app.use('/maps', require('./routes/map'))
app.use('/concept', require('./routes/concept'))
// GET localhost:8081/concept/list

// SETUP IO
require('./io/campaign')(socket.getIo());

// LISTEN
server.listen(PORT, () => {
    console.log("Dragonroll backend started");
});