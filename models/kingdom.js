const credentials = require('../lib/credentials');
const mongoose = require ('mongoose');

mongoose.connect(credentials.connectionString, {
    dbName: 'sccprojects', useNewUrlParser: true
});

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});

// define Kingdom model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
    name: { type: String, required: true },
    legs: Number,
    count: Number,
    fluidtemp: String,
    mobile: String
   }); 
   
   module.exports = mongoose.model('Kingdom', mySchema)