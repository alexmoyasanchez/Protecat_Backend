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
const usuario_2 = __importDefault(require("../models/usuario"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function getAllUsuarios(req, res) {
    usuario_2.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getUsuario(req, res) {
    usuario_2.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getUsuarioByUsername(req, res) {
    usuario_2.default.findOne({ "username": req.params.username }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getUsuarioByEmail(req, res) {
    usuario_2.default.findOne({ "email": req.params.email }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newUsuario(req, res) {
    const usuario_1 = new usuario_2.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "nombre": req.body.nombre,
        "edad": req.body.edad,
        "descripcion": req.body.descripcion,
        "imageUrl": req.body.imageUrl,
        "puntuacion": req.body.puntuacion
    });
    usuario_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updateUsuario(req, res) {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const descripcion = req.body.descripcion;
    const imageUrl = req.body.imageUrl;
    const puntuacion = req.body.puntuacion;
    const connected = req.body.connected;
    usuario_2.default.update({ "id": id }, { $set: { "id": id, "username": username, "password": password, "email": email, "nombre": nombre, "edad": edad, "descripcion": descripcion, "imageUrl": imageUrl, "puntuacion": puntuacion } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteUsuario(req, res) {
    const { id } = req.params;
    usuario_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function LogIn(req, res) {
    let body = req.body;
    //erro y usuarioDB any(?)
    usuario_2.default.findOne({ email: body.email }, (erro, usuarioDB) => {
        if (erro) {
            return res.status(500).json({
                ok: false,
                err: erro
            });
        }
        // Verifica que exista un usuario con el mail escrita por el usuario.
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (body.password != usuarioDB.password) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        // Genera el token de autenticación
        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED_AUTENTICACION, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        });
        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        });
    });
}
function updatePuntuacion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        var puntuacion;
        var puntosdadosnum = +req.params.puntos;
        yield usuario_2.default.findOne({ "id": id }).then((data) => {
            puntuacion = data === null || data === void 0 ? void 0 : data.puntuacion;
        });
        var newPuntuacion = puntuacion + puntosdadosnum;
        usuario_2.default.update({ "id": id }, { $set: { "puntuacion": newPuntuacion } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
exports.default = { getAllUsuarios, getUsuario, getUsuarioByEmail, newUsuario, updateUsuario, deleteUsuario, LogIn, getUsuarioByUsername, updatePuntuacion };
