const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({ path : "./config.env"});
const con = require('./db/connection.js');
const controller = require("./controller/controller");
const port = process.env.PORT || 5000;

app.use(express.json());

// use middleware
app.use(cors({
    origin:'*',
    methods: ['GET','POST','DELETE']
}));

con.then(db=>{
    if(!db) return process.exit(1);

    //middleware
    app.use(cors({
        origin:'*',
        methods: ['GET','POST','DELETE']
    }));

    app.use(function (req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "GET, HEAD, OPTIONS, POST, PUT, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        next();
    });
        

    //Create Transactions
    app.post('/create_Transaction', controller.create_Transaction);

    //Get Transactions
    app.get('/get_Transactions',async (req, res)=>{
        let data = await controller.get_Transaction();
        return res.json(await data);
    });

    //Delete Transaction
    app.post('/delete_Transaction', controller.delete_Transaction);

      app.listen(port,() => {
        console.log(`HTTPS Server running on port ${port}`);
    });
      


}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});

//PRODUCTION
if(process.env.NODE_ENV === 'production'){

    app.use(cors({
        origin:'*',
        methods: ['GET','POST','DELETE']
    }));

    app.get('/', (req, res)=>{
        res.send('REST API for https://personaltracker.web.app/')
    });

    app.get('/get_Transactions',async (req, res)=>{
        let data = await controller.get_Transaction();
        return res.json(await data);
    });


    app.use(function (req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "GET, HEAD, OPTIONS, POST, PUT, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        next();
    });

}

