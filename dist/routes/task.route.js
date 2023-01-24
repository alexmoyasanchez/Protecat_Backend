"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const authJWT_1 = require("../middelware/authJWT");
const router = (0, express_1.Router)();
router.get('/', task_controller_1.default.getAllTasks);
router.get('/getTask/:id', task_controller_1.default.getTask);
router.get('/getTaskByUser/:email', task_controller_1.default.getTaskByUser);
router.post('/new/:userId', [authJWT_1.isAdmin], task_controller_1.default.newTask);
router.put('/update/:id/:userId', [authJWT_1.isAdmin], task_controller_1.default.updateTask);
router.put('/check/:id', task_controller_1.default.taskDone);
router.put('/uncheck/:id', task_controller_1.default.taskNotDone);
router.put('/assignTask/:id/:user/:userId', [authJWT_1.isAdmin], task_controller_1.default.assignTask);
router.delete('/delete/:id/:userId', [authJWT_1.isAdmin], task_controller_1.default.deleteTask);
exports.default = router;
