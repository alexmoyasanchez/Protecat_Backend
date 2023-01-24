import { Request, Response} from "express";
import { getAllJSDocTags } from "typescript";
import request from "../models/form";


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function getAllForms (req:Request, res:Response): void {
    request.find({}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getForm (req:Request, res:Response): void {
    request.findOne({"id":req.params.id}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getFormByUser (req:Request, res:Response): void {
    request.findOne({"idOwner":req.params.idOwner}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function newForm (req:Request, res:Response): void {
    const request_1 = new request({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "user": req.body.user,
        "state": req.body.state
    });
    
    request_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


function updateForm (req:Request, res:Response): void {
    const id = req.params.id;
    const identificator: String = req.body.identificator;
    const user: String = req.body.user;
    const state: String = req.body.state;


    request.update({"id": id}, {$set: {"id": id, "user": user, "state": state}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


function deleteForm(req:Request, res:Response): void {
    const { id } = req.params;
    request.findOne({"id":req.params.id}).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

export default { getAllForms, getForm, newForm, updateForm, deleteForm, getFormByUser};