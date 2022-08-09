const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inotebook';

mongoose.connect(mongoURI,{ useNewUrlParser: true});
// connectoMongo();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/auth',require('./routes/auth'));
app.use('/crud',require('./routes/crud'));

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
});