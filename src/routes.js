const express = require('express');
const routes = express.Router();
const AuthController = require('./controllers/authController');

routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);

module.exports = routes;