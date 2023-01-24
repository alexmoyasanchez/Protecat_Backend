"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mensaje_2 = __importDefault(require("../models/mensaje"));
function getAllMensajes(req, res) {
    mensaje_2.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function deleteChat(req, res) {
    const { user } = req.params;
    mensaje_2.default.findOne({ "sender": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newMensaje(req, res) {
    const mensaje_1 = new mensaje_2.default({
        "sender": req.body.sender,
        "text": req.body.text,
        "time": req.body.time
    });
    mensaje_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
exports.default = { getAllMensajes, newMensaje, deleteChat };
