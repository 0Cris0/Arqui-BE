const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const Stock = require('./models/stock');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Para lo de CORS
    next();
});

//test route
app.get("/", (req, res, next) => {
    res.send("Hi universe");
});

// CRUD routes
app.use("/stocks", require("./routes/stock"));

// manejo de errores
app.use((error, req, res, next) =>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    });
});


// syncronización
sequelize
    .sync()
    .then(result =>{
        console.log("Conectado a la BD");
        app. listen(3000);
    })
    .catch(err => console.log(err));