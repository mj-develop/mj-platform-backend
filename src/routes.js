const express = require('express');
const routes = express.Router();
const AuthController = require('./controllers/authController');
const StudentController = require('./controllers/studentController');

routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);
routes.post("/forgot_password", AuthController.forgot_password);
routes.post("/reset_password", AuthController.reset_password);


routes.get("/students", StudentController.index);
routes.get("/students/:id", StudentController.show);
routes.post("/students", StudentController.create);
routes.put("/students/:id", StudentController.update);
routes.delete("/students/:id", StudentController.destroy);

module.exports = routes;