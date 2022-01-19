const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
//const uri = "mongodb+srv://alinguite:1W@rren2@cluster0.owkwa.mongodb.net/test?retryWrites=true&w=majority";
const userRoutes = require('./routes/schtroumpfs');
const appartooRoutes = require('./routes/appartoo');
const { collection } = require('./models/Schtroumpfs');
const cors = require('cors');

//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//client.connect(err => {
  //const collection = client.db("test").collection("schtroumpfs");
  // perform actions on the collection object
  //console.log(collection)
//})

mongoose.connect(`mongodb+srv://alinguite:19982010@cluster0.owkwa.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Connexion à MongoDB échouée !', err));


  

//app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    //next();
  //});
   
  app.use(cors());


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  
  app.use('/api/auth', userRoutes);
  app.use('/api/appartoo', appartooRoutes);



module.exports = app;