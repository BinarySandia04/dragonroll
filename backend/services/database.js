const mongoose = require('mongoose');
const fs = require('fs')
const config = JSON.parse(fs.readFileSync("config.json"));

const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod = null;

const connectDB = async() => {
    try {
        let dbUrl = `mongodb://${process.env.DEBUG ? config.mongo_ip_debug : config.mongo_ip}/dragonroll`;
        if(process.env.NODE_ENV == 'test'){
            mongod = await MongoMemoryServer.create();
            dbUrl = mongod.getUri();
        }

        const conn = await mongoose.connect(dbUrl);

        console.log(`Connected to MongoDB: ${dbUrl}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

const disconnectDB = async() => {
    try {
        await mongoose.connection.close();
        if(mongod) {
            await mongod.stop();
        }
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = { connectDB, disconnectDB };