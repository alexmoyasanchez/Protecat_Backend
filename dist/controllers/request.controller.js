"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_2 = __importDefault(require("../models/request"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function getAllRequests(req, res) {
    request_2.default.find({}).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getRequest(req, res) {
    request_2.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getRequestByUser(req, res) {
    request_2.default.findOne({ "idOwner": req.params.idOwner }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function getRequestByCat(req, res) {
    request_2.default.findOne({ "idOwner": req.params.idOwner }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newRequest(req, res) {
    const request_1 = new request_2.default({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "cat": req.body.cat,
        "user": req.body.user,
        "state": req.body.state,
        "validation": req.body.validation
    });
    request_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function updateRequest(req, res) {
    const id = req.params.id;
    const cat = req.body.cat;
    const user = req.body.user;
    const state = req.body.state;
    const validation = req.body.validation;
    request_2.default.update({ "id": id }, { $set: { "id": id, "cat": cat, "user": user, "state": state, "validation": validation } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deleteRequest(req, res) {
    const { id } = req.params;
    request_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
exports.default = { getAllRequests, getRequest, newRequest, updateRequest, deleteRequest, getRequestByUser, getRequestByCat };
