const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middleware/auth');
const AuthController = require('./controllers/authController');
const StudentController = require('./controllers/studentController');
const CourseController = require('./controllers/courseController');
const ClassController = require('./controllers/classController');
const DisciplineController = require('./controllers/disciplineController');
const TeacherController = require('./controllers/teacherController');
const PlanController = require('./controllers/planController');
const PostController = require('./controllers/postController');
const CommentController = require('./controllers/commentController');
const ModuleController = require('./controllers/moduleController');
const LessonController = require('./controllers/lessonController');
const DoubtController = require('./controllers/doubtController');

routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);
routes.get("/profile", authMiddleware, AuthController.profile);
routes.post("/forgot_password", AuthController.forgot_password);
routes.post("/reset_password", AuthController.reset_password);

routes.get("/students", StudentController.index);
routes.get("/students/:id", StudentController.show);
routes.post("/students", StudentController.create);
routes.put("/students/:id", StudentController.update);
routes.delete("/students/:id", StudentController.destroy);
routes.post("/students/:id", StudentController.register);

routes.get("/teachers", TeacherController.index);
routes.get("/teachers/:id", TeacherController.show);
routes.post("/teachers", TeacherController.create);
routes.put("/teachers/:id", TeacherController.update);
routes.delete("/teachers/:id", TeacherController.destroy);

routes.get("/courses", CourseController.index);
routes.get("/courses/:id", CourseController.show);
routes.post("/courses", CourseController.create);
routes.put("/courses/:id", CourseController.update);
routes.delete("/courses/:id", CourseController.destroy);

routes.get("/classes", ClassController.index);
routes.get("/classes/:id", ClassController.show);
routes.post("/classes", ClassController.create);
routes.put("/classes/:id", ClassController.update);
routes.delete("/classes/:id", ClassController.destroy);
routes.patch("/classes/:id/students", ClassController.managerStudents);

routes.get("/disciplines", DisciplineController.index);
routes.get("/disciplines/:id", DisciplineController.show);
routes.post("/disciplines", DisciplineController.create);
routes.put("/disciplines/:id", DisciplineController.update);
routes.delete("/disciplines/:id", DisciplineController.destroy);

routes.get("/plans", PlanController.index);
routes.get("/plans/:id", PlanController.show);
routes.post("/plans", PlanController.create);
routes.put("/plans/:id", PlanController.update);
routes.delete("/plans/:id", PlanController.destroy);
routes.patch("/plans/:id/disciplines", PlanController.managerDisciplines);

routes.get("/posts", PostController.index);
routes.get("/posts/:id", PostController.show);
routes.get("/posts/:id/comments", PostController.getComments);
routes.post("/posts", PostController.create);
routes.put("/posts/:id", PostController.update);
routes.delete("/posts/:id", PostController.destroy);

routes.get("/comments", CommentController.index);
routes.get("/comments/:id", CommentController.show);
routes.post("/comments", CommentController.create);
routes.put("/comments/:id", CommentController.update);
routes.delete("/comments/:id", CommentController.destroy);

routes.get("/modules", ModuleController.index);
routes.get("/modules/:id", ModuleController.show);
routes.post("/modules", ModuleController.create);
routes.put("/modules/:id", ModuleController.update);
routes.delete("/modules/:id", ModuleController.destroy);

routes.get("/lessons", LessonController.index);
routes.get("/lessons/:id", LessonController.show);
routes.post("/lessons", LessonController.create);
routes.put("/lessons/:id", LessonController.update);
routes.delete("/lessons/:id", LessonController.destroy);

routes.get("/doubts", DoubtController.index);
routes.get("/doubts/:id", DoubtController.show);
routes.post("/doubts", DoubtController.create);
routes.put("/doubts/:id", DoubtController.update);
routes.delete("/doubts/:id", DoubtController.destroy);

module.exports = routes;