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
const cat_2 = __importDefault(require("../models/cat"));
const colony_1 = __importDefault(require("../models/colony"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function getAllCats(req, res) {
    cat_2.default.find({}).populate('colony').then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getCat(req, res) {
    //Primero se busca el gato por el ID enviado (req.params.id)
    cat_2.default.findOne({ "id": req.params.id }).then((data) => {
        //Por defecto iguala el status a 200, que significa que la búsqueda ha sido correcta
        let status = 200;
        //Si no se encuentra el gato (data == null), iguala el status a 404, que indica que no lo ha encontrado
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        //Si la búsqueda ha desencadenado un error devuelve al usuario un código 500.
        return res.status(500).json(err);
    });
}
function getCatByName(req, res) {
    cat_2.default.findOne({ "name": req.params.name }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newCat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cat_1 = new cat_2.default({
            "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
            "name": req.body.name,
            "sex": req.body.sex,
            "weight": req.body.weight,
            "compatibilities": req.body.compatibilities,
            "incompatibilities": req.body.incompatibilities,
            "diseases": req.body.diseases,
            "imageUrl": req.body.imageUrl,
            "colony": yield colony_1.default.findOne({ id: "0" })
        });
        const cat1 = yield cat_2.default.findOne({ id: cat_1.id }).populate("_id");
        yield colony_1.default.updateOne({ name: "Sin colonia asignada" }, { $push: { cats: cat_1 === null || cat_1 === void 0 ? void 0 : cat_1._id } });
        cat_1.save().then((data) => {
            return res.status(201).json(data);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    });
}
function updateCat(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const sex = req.body.sex;
    const weight = req.body.weight;
    const compatibilities = req.body.compatibilities;
    const incompatibilities = req.body.incompatibilities;
    const diseases = req.body.diseases;
    const imageUrl = req.body.imageUrl;
    const colony = req.body.colony;
    cat_2.default.update({ "id": id }, { $set: { "id": id, "name": name, "sex": sex, "weight": weight, "compatibilities": compatibilities, "incompatibilities": incompatibilities, "diseases": diseases, "imageUrl": imageUrl, "colony": colony } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteCat(req, res) {
    const { id } = req.params;
    cat_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
exports.default = { getAllCats, getCat, newCat, updateCat, deleteCat, getCatByName };
