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
const cat_1 = __importDefault(require("../models/cat"));
const colony_2 = __importDefault(require("../models/colony"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function getAllColonies(req, res) {
    colony_2.default.find({}).populate('cats').then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getColony(req, res) {
    colony_2.default.findOne({ "id": req.params.id }).populate('cats').then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getColonyByName(req, res) {
    colony_2.default.findOne({ "name": req.params.name }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newColony(req, res) {
    const colony_1 = new colony_2.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "name": req.body.name,
        "locationx": req.body.locationx,
        "locationy": req.body.locationy,
        "observations": req.body.observations,
        "cats": req.body.cats
    });
    colony_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updateColony(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const locationx = req.body.locationx;
    const locationy = req.body.locationy;
    const observations = req.body.observations;
    const cats = req.body.cats;
    colony_2.default.updateOne({ "id": id }, { $set: { "id": id, "name": name, "locationx": locationx, "locationy": locationy, "observations": observations, "cats": cats } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function addCat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const colony = yield colony_2.default.findOne({ "id": req.params.id }).populate('_id');
        const colony0 = yield colony_2.default.findOne({ "id": "0" }).populate('_id');
        yield colony_2.default.updateOne({ id: req.params.id }, { $push: { cats: req.params.cat } }).then((data) => __awaiter(this, void 0, void 0, function* () {
            yield cat_1.default.updateOne({ _id: req.params.cat }, { $push: { colony: colony === null || colony === void 0 ? void 0 : colony._id } });
            yield colony_2.default.updateOne({ id: "0" }, { $pull: { cats: req.params.cat } });
            yield cat_1.default.updateOne({ _id: req.params.cat }, { $pull: { colony: colony0 === null || colony0 === void 0 ? void 0 : colony0._id } });
            res.status(201).json(data);
        })).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function deleteColony(req, res) {
    const { id } = req.params;
    colony_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function removeCatOfColony2(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cat = yield cat_1.default.findOne({ "id": req.params.idCat }).populate('_id');
        const colony = yield colony_2.default.findOne({ "id": req.params.id }).populate('_id');
        yield cat_1.default.updateOne({ id: req.params.idCat }, { $pull: { colony: colony === null || colony === void 0 ? void 0 : colony._id } });
        yield colony_2.default.updateOne({ id: req.params.id }, { $pull: { cats: cat === null || cat === void 0 ? void 0 : cat._id } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function removeCatOfColony(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cat = yield cat_1.default.findOne({ "id": req.params.idCat }).populate('_id');
        const colony = yield colony_2.default.findOne({ "id": req.params.id }).populate('_id');
        const colony0 = yield colony_2.default.findOne({ "id": "0" }).populate('_id');
        yield cat_1.default.updateOne({ id: req.params.idCat }, { $push: { colony: colony0 === null || colony0 === void 0 ? void 0 : colony0._id } });
        yield cat_1.default.updateOne({ id: req.params.idCat }, { $pull: { colony: colony === null || colony === void 0 ? void 0 : colony._id } });
        yield colony_2.default.updateOne({ id: "0" }, { $push: { cats: cat === null || cat === void 0 ? void 0 : cat._id } });
        yield colony_2.default.updateOne({ id: req.params.id }, { $pull: { cats: cat === null || cat === void 0 ? void 0 : cat._id } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
exports.default = { getAllColonies, getColony, newColony, updateColony, addCat, deleteColony, getColonyByName, removeCatOfColony, removeCatOfColony2 };
