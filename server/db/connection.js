const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI)
    .then(db =>{
        console.log("Database Connected");
        return db;
    }).catch( err=>{
        console.log(`Connection Error ${err}`);
    })

    module.exports = conn;

    //"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"