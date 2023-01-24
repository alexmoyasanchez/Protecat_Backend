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
const object_2 = __importDefault(require("../models/object"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function getAllObjects(req, res) {
    object_2.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getObject(req, res) {
    object_2.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getObjectByName(req, res) {
    object_2.default.findOne({ "name": req.params.name }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newObject(req, res) {
    const object_1 = new object_2.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "name": req.body.name,
        "imageUrl": req.body.imageUrl,
        "price": parseFloat(req.body.price),
        "description": req.body.description,
        "units": parseInt(req.body.units)
    });
    console.log("OBJETO:");
    console.log(object_1);
    object_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updateObject(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const units = req.body.units;
    object_2.default.update({ "id": id }, { $set: { "id": id, "name": name, "imageUrl": imageUrl, "price": price, "description": description, "units": units } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteObject(req, res) {
    const { id } = req.params;
    object_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function subUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = yield object_2.default.findOne({ id: req.params.id }).populate("units");
        object_2.default.updateOne({ "id": req.params.id }, { $set: { "units": parseInt(object["units"]) - 1 } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function addUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = yield object_2.default.findOne({ id: req.params.id }).populate("units");
        object_2.default.updateOne({ "id": req.params.id }, { $set: { "units": parseInt(object["units"]) + 1 } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
exports.default = { getAllObjects, getObject, newObject, updateObject, deleteObject, getObjectByName, subUnit, addUnit };
