"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const valoracion_2 = __importDefault(require("../models/valoracion"));
function getAllValoraciones(req, res) {
    valoracion_2.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getValoracion(req, res) {
    valoracion_2.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getValoracionesByBar(req, res) {
    valoracion_2.default.find({ "idBar": req.params.idBar }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newValoracion(req, res) {
    const valoracion_1 = new valoracion_2.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "idBar": req.body.idBar,
        "idUsuario": req.body.idUsuario,
        "puntos": req.body.puntos,
        "descripcion": req.body.descripcion
    });
    valoracion_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updateValoracion(req, res) {
    const id = req.body.id;
    const idBar = req.body.idUsuario;
    const idUsuario = req.body.idPublicacion;
    const puntos = req.body.puntos;
    const descripcion = req.body.descripcion;
    valoracion_2.default.update({ "id": id }, { $set: { "id": id, "idBar": idBar, "idUsuario": idUsuario, "puntos": puntos, "descripcion": descripcion } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteValoracion(req, res) {
    const { id } = req.params;
    valoracion_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
exports.default = { getAllValoraciones, getValoracion, getValoracionesByBar, newValoracion, updateValoracion, deleteValoracion };
