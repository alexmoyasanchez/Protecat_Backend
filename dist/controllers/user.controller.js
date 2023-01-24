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
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
function getAllUsers(req, res) {
    user_1.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getUser(req, res) {
    user_1.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getUserByUsername(req, res) {
    user_1.default.findOne({ "username": req.params.username }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getUserByEmail(req, res) {
    user_1.default.findOne({ "email": req.params.email }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getUserById(req, res) {
    user_1.default.findById(req.params.id).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Math.floor(Math.random() * (10000000 - 1 + 1) + 1);
        const { username, password, email, imageUrl, tasks } = req.body;
        const salt = yield bcrypt.genSalt(10);
        const hashed = yield bcrypt.hash(password, salt);
        const newUser = new user_1.default({ id, username, password: hashed, email, imageUrl });
        const roleadded = yield role_1.default.findOne({ name: "standard" });
        newUser.roles = roleadded === null || roleadded === void 0 ? void 0 : roleadded._id;
        yield newUser.save();
        res.status(200);
    });
}
function updateUser(req, res) {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const imageUrl = req.body.imageUrl;
    const tasks = req.body.tasks;
    user_1.default.update({ "id": id }, { $set: { "id": id, "username": username, "password": password, "email": email, "imageUrl": imageUrl, "tasks": tasks } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteUser(req, res) {
    user_1.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function LogIn(req, res) {
    let body = req.body;
    //erro y usuarioDB any(?)
    user_1.default.findOne({ email: body.email }, (erro, userDB) => __awaiter(this, void 0, void 0, function* () {
        if (erro) {
            return res.status(500).json({
                ok: false,
                err: erro
            });
        }
        // Verifica que exista un usuario con el mail escrito por el usuario.
        if (!userDB) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        const matchPassword = yield bcrypt.compare(body.password, userDB.password);
        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (!matchPassword) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        // Genera el token de autenticación
        let token = jwt.sign({
            user: userDB,
        }, process.env.SEED_AUTENTICACION, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        });
        res.json({
            ok: true,
            user: userDB,
            token,
        });
    }));
}
function getTasks(req, res) {
    //Buscamos al usuario por su ID, y después obtenemos las tareas de este usuario
    user_1.default.findById(req.params.id).populate('tasks').then((data) => {
        //Por defecto se devuelve un código 200 indicando que la búsqueda ha sido correcta
        let status = 200;
        //En caso de que no se encuentre ninguna tarea del usuario se refiere con un código 404
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        //En caso de que suceda un error se notifica con un código 500 
        return res.status(500).json(err);
    });
}
function addPermission(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleadded = yield role_1.default.findOne({ name: "admin" });
        user_1.default.updateOne({ "id": req.params.id }, { $push: { "roles": roleadded === null || roleadded === void 0 ? void 0 : roleadded._id } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
exports.default = { getAllUsers, getUser, getUserByEmail, getUserById, newUser, updateUser, deleteUser, LogIn, getUserByUsername, getTasks, addPermission };
