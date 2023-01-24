"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = __importDefault(require("../models/form"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function getAllForms(req, res) {
    form_1.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getForm(req, res) {
    form_1.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getFormByUser(req, res) {
    form_1.default.findOne({ "idOwner": req.params.idOwner }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newForm(req, res) {
    const request_1 = new form_1.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "user": req.body.user,
        "state": req.body.state
    });
    request_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updateForm(req, res) {
    const id = req.params.id;
    const identificator = req.body.identificator;
    const user = req.body.user;
    const state = req.body.state;
    form_1.default.update({ "id": id }, { $set: { "id": id, "user": user, "state": state } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteForm(req, res) {
    const { id } = req.params;
    form_1.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
exports.default = { getAllForms, getForm, newForm, updateForm, deleteForm, getFormByUser };
