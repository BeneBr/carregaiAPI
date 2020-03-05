'user strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const helmet = require('helmet');

const app = express();
const HOST = "0.0.0.0";
const PORT = 8080;

app.use(bodyParser.json({limit: '10mb'}));
app.use(express.json());
app.use(helmet());

mongoose.connect("mongodb://localhost:27017", {useNewUrlParser:true, useUnifiedTopology: true});
require('./src/Models/UserModel/userModel');

const authRoutes = require('./src/Routes/AuthRoutes/authRoutes');
const userRoutes = require('./src/Routes/UserRoutes/userRoutes');



app.get("/", (req, res)=>{
    res.send("OLA MUNDO");
});

app.use(authRoutes);

app.use(userRoutes);

app.listen(PORT,HOST);
