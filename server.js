const path = require("path")

const express = require('express');
const bodyParser = require("body-parser")

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const wirdalRoutes = require('./routes/wirdal')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(wirdalRoutes);

app.listen(3000);