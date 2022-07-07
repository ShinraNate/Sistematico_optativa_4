'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db');
// init DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserUrlEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserUrlEncoded);

app.use(cors());

app.use('/api', router);
authRoutes(router);
router.get('/', (req, res)=>{
    res.send('Hola desde casa');
});
app.use(router);
app.listen(3000, () => console.log(`servidor corriendo en el puerto ${properties.PORT}`)

);