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
const comunidad_2 = __importDefault(require("../models/comunidad"));
function getAllComunidades(req, res) {
    comunidad_2.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getComunidad(req, res) {
    comunidad_2.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getComunidadByUser(req, res) {
    comunidad_2.default.find({ "idOwner": req.params.idOwner }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getComunidadByName(req, res) {
    comunidad_2.default.find({ "name": req.params.name }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newComunidad(req, res) {
    const comunidad_1 = new comunidad_2.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "name": req.body.name,
        "owner": req.body.owner,
        "idOwner": req.body.idOwner,
        "usuarios": req.body.idOwner,
        "descripcion": req.body.descripcion,
        "imageUrl": req.body.imageUrl
    });
    comunidad_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updateComunidad(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const owner = req.body.owner;
    const idOwner = req.body.idOwner;
    const descripcion = req.body.descripcion;
    const imageUrl = req.body.imageUrl;
    comunidad_2.default.update({ "id": id }, { $set: { "id": id, "name": name, "owner": owner, "idOwner": idOwner, "descripcion": descripcion, "imageUrl": imageUrl } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteComunidad(req, res) {
    const { id } = req.params;
    comunidad_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function unirmeComunidad(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const idUsuario = req.params.idUsuario;
        const idComunidad = req.params.idComunidad;
        yield comunidad_2.default.updateOne({ "id": idComunidad }, { $addToSet: { "usuarios": idUsuario } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function abandonarComunidad(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const idUsuario = req.params.idUsuario;
        const idComunidad = req.params.idComunidad;
        const comunidad_1 = yield comunidad_2.default.findOne({ "id": idComunidad }).exec();
        const index = comunidad_1 === null || comunidad_1 === void 0 ? void 0 : comunidad_1.usuarios.indexOf(idUsuario);
        if (index != undefined) {
            comunidad_1 === null || comunidad_1 === void 0 ? void 0 : comunidad_1.usuarios.splice(index, 1);
        }
        yield comunidad_2.default.updateOne({ "id": idComunidad }, { $set: { "usuarios": comunidad_1 === null || comunidad_1 === void 0 ? void 0 : comunidad_1.usuarios } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
exports.default = { getAllComunidades, getComunidad, getComunidadByUser, newComunidad, updateComunidad, deleteComunidad, unirmeComunidad, abandonarComunidad, getComunidadByName };
