const User = require('./auth.controller');
module.exports = (router)=>{
    router.post('/register', User.createUser);
    router.post('/login', User.loginUser);
    router.get('/users', User.getUser);
    router.put('/act/:id', User.updateUser);
}