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
const publicacion_2 = __importDefault(require("../models/publicacion"));
function getAllPublicaciones(req, res) {
    publicacion_2.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getPublicacion(req, res) {
    publicacion_2.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newPublicacion(req, res) {
    const publicacion_1 = new publicacion_2.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "idBar": req.body.idBar,
        "nameBar": req.body.nameBar,
        "imageBar": req.body.imageBar,
        "texto": req.body.texto,
        "imageUrl": req.body.imageUrl,
        "fecha": req.body.fecha,
        "likes": req.body.likes
    });
    publicacion_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updatePublicacion(req, res) {
    const id = req.body.id;
    const idBar = req.body.idBar;
    const nameBar = req.body.nameBar;
    const imageBar = req.body.imageBar;
    const texto = req.body.texto;
    const imageUrl = req.body.imageUrl;
    const fecha = req.body.fecha;
    const likes = req.body.likes;
    publicacion_2.default.update({ "id": id }, { $set: { "id": id, "idBar": idBar, "nameBar": nameBar, "imageBar": imageBar, "texto": texto, "imageUrl": imageUrl, "fecha": fecha, "likes": likes } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deletePublicacion(req, res) {
    const { id } = req.params;
    publicacion_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function darLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const idUsuario = req.params.idUsuario;
        const idPublicacion = req.params.idPublicacion;
        yield publicacion_2.default.updateOne({ "id": idPublicacion }, { $addToSet: { "likes": idUsuario } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function deshacerLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const idUsuario = req.params.idUsuario;
        const idPublicacion = req.params.idPublicacion;
        const publicacion_1 = yield publicacion_2.default.findOne({ "id": idPublicacion }).exec();
        const index = publicacion_1 === null || publicacion_1 === void 0 ? void 0 : publicacion_1.likes.indexOf(idUsuario);
        if (index != undefined) {
            publicacion_1 === null || publicacion_1 === void 0 ? void 0 : publicacion_1.likes.splice(index, 1);
        }
        yield publicacion_2.default.updateOne({ "id": idPublicacion }, { $set: { "likes": publicacion_1 === null || publicacion_1 === void 0 ? void 0 : publicacion_1.likes } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
exports.default = { getAllPublicaciones, getPublicacion, newPublicacion, updatePublicacion, deletePublicacion, darLike, deshacerLike };
