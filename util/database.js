const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://selena:12345@cluster0.8q2aa.mongodb.net/NodeJsTutorial?retryWrites=true&w=majority')
    .then(client => {
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db){
        return _db;
    }

    throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;