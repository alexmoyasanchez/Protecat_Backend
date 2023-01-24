"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("../models/task"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function getAllTasks(req, res) {
    task_1.default.find({}).populate('volunteer').then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getTask(req, res) {
    task_1.default.findById(req.params.id).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getTaskByUser(req, res) {
    user_1.default.findOne({ "email": req.params.email }).populate('tasks').then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function newTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ "username": req.body.volunteer }).populate('_id');
        console.log(user._id);
        const task = new task_1.default({
            "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
            "date": new Date(req.body.date),
            "subject": req.body.subject,
            "description": req.body.description,
            "done": false,
            "volunteer": yield user_1.default.findOne({ "username": req.body.volunteer }),
        });
        task.save().then((data) => __awaiter(this, void 0, void 0, function* () {
            const task2 = yield task_1.default.findOne({ id: task.id }).populate("_id");
            yield task_1.default.updateOne({ _id: task2._id }, { $push: { volunteer: user === null || user === void 0 ? void 0 : user._id } });
            yield user_1.default.updateOne({ username: req.body.volunteer }, { $push: { tasks: task2._id } });
            return res.status(201).json(data);
        })).catch((err) => {
            return res.status(500).json(err);
        });
    });
}
function updateTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const date = req.body.date;
        const subject = req.body.subject;
        const description = req.body.description;
        task_1.default.update({ "id": id }, { $set: { "id": id, "date": date, "subject": subject, "description": description } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function taskDone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const done = true;
        task_1.default.update({ "id": id }, { $set: { "id": id, "done": done } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function taskNotDone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const done = false;
        task_1.default.update({ "id": id }, { $set: { "id": id, "done": done } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function assignTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const task2 = yield task_1.default.findOne({ "id": req.params.id });
        user_1.default.updateOne({ "_id": req.params.user }, { $push: { "tasks": task2 === null || task2 === void 0 ? void 0 : task2._id } });
        task_1.default.updateOne({ id: req.params.id }, { $set: { volunteer: req.params.user } }).then((data) => {
            res.status(201).json(data);
        });
    });
}
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        task_1.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
            return res.status(201).json(data);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    });
}
exports.default = { getAllTasks, getTask, getTaskByUser, newTask, updateTask, taskDone, taskNotDone, assignTask, deleteTask };
function handleError(err) {
    throw new Error("Function not implemented.");
}
