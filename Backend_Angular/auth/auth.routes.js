const Users = require('./auth.controllers');
module.exports = (router)=>{
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
}