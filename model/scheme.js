const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type: String,
        require: true,
    },
    skill:{
        type: String,
        require: true,
    },
    
    password:{
        type: String,
        require: true,
    }
},  {timestamp: true});

const Model = mongoose.model('form', schema)
module.exports = Model;