const { MongoClient, Server } = require('mongodb');
const URI   = "mongodb://localhost:27017/sampleDB";
const DB    = "sampleDB";
const COL   = "Users";

exports.URI = URI;
exports.DB = DB;
exports.USERS_COLLECTION = COL;
exports.client = new MongoClient(new Server('localhost','27017'));
