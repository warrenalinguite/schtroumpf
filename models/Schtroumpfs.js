const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const uniqueValidator = require('mongoose-unique-validator');

const schtroumpfSchema = mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  friends:[],
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//schtroumpfSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Schtroumpfs', schtroumpfSchema);