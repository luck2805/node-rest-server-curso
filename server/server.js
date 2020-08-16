require('./config/config');

const mongoose = require('mongoose');
const express = require('express')
const app = express()

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/index'));


// mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('ggolis')
//   // we're connected!
// });
mongoose.connect(process.env.URL_DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },  (err, res) => {
    if (err) throw err;
    console.log('Base de datos online')
});


app.listen(process.env.PORT, () => console.log('Escuchando en el puerto:', process.env.PORT));