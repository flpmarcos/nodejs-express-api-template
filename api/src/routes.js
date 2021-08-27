const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');

// Aqui é possivel valida autenticacao por keycloack baseado em variavel de ambiente
const auth = require("./middleware/auth");

routes.get('/users',auth, UserController.show);
routes.get('/users/:id',auth, UserController.index);
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

module.exports = routes;

