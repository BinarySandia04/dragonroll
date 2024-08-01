const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const PORT = 8081;

const config = JSON.parse(fs.readFileSync("config.json"));
global.appRoot = path.resolve(__dirname);


var mongo_final_ip = "";

console.log("Production? " + !process.env.DEBUG);
if(process.env.DEBUG){
    mongo_final_ip = "mongodb://" + config.mongo_ip_debug + "/dragonroll";
} else {
    mongo_final_ip = "mongodb://" + config.mongo_ip + "/dragonroll";
}
console.log(mongo_final_ip)

mongoose.connect(mongo_final_ip).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});

app.use(morgan('tiny'));

app.use(passport.initialize());
require('./config/passport')(passport);

// Carpeta publica
app.use("/public", express.static(__dirname + '/public'));
// app.use("/.well-known", express.static(__dirname + '/.well-known'));

// IDk per a què serveix això
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    extended : false,
    limit: '50mb'
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes (/ només)
app.use('/user', require('./routes/user'));

// app.use('/users', require('./routes/users'));
app.listen(PORT, () => {
    console.log("Dragonroll backend started");
});

app.use('/public', express.static('uploads'));