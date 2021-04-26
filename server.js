'use strict'
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db');
const cors = require('cors');
//init DB
DB();
const app = express();
const router = express.Router();


app.use(express.json());
app.use(cors());

app.use('/api', router);
authRoutes(router);
router.get('/', (req, res)=>{
    res.send('hola al inicio');
});
app.use(router);
app.listen(properties.PORT, ()=> console.log(`server runing in port ${properties.PORT}`));