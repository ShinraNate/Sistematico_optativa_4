const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () =>{
    mongoose.connect(dbURL, {useNewUrlParser: true})
        .then(()=> console.log(`Mongo conectado en ${dbURL}`))
        .catch(err => console.log(`Connection has error ${err}`))

    process.on('SIGINT', ()=>{
        mongoose.connection.close (()=>{
            console.log(`Mongo se desconectó`);
            process.exit(0)
        });
    });
}