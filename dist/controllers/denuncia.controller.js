"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const denuncia_2 = __importDefault(require("../models/denuncia"));
function getAllDenuncias(req, res) {
    denuncia_2.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getDenuncia(req, res) {
    denuncia_2.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newDenuncia(req, res) {
    const denuncia_1 = new denuncia_2.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "idUsuario": req.body.idUsuario,
        "idPublicacion": req.body.idPublicacion,
        "descripcion": req.body.descripcion
    });
    denuncia_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updateDenuncia(req, res) {
    const id = req.body.id;
    const idUsuario = req.body.idUsuario;
    const idPublicacion = req.body.idPublicacion;
    const descripcion = req.body.descripcion;
    denuncia_2.default.update({ "id": id }, { $set: { "id": id, "idUsuario": idUsuario, "idPublicacion": idPublicacion, "descripcion": descripcion } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteDenuncia(req, res) {
    const { id } = req.params;
    denuncia_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
exports.default = { getAllDenuncias, getDenuncia, newDenuncia, updateDenuncia, deleteDenuncia };
