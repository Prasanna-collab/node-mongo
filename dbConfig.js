const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const dbName = "mystudents";
const dbUrl = `mongodb+srv://Prasanna:Prasanna2%40@cluster0.3kjpl0w.mongodb.net/${dbName}`;



module.exports={mongodb,dbUrl,MongoClient}