const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');

// Aqui é possivel valida autenticacao por keycloack baseado em variavel de ambiente
const auth = require("./middleware/auth");

// Register em login methods
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

// Methods using authentication
routes.post('/welcome',auth, UserController.welcome);
routes.post('/users',auth, UserController.show);
routes.post('/users/:id',auth, UserController.index);



module.exports = routes;

