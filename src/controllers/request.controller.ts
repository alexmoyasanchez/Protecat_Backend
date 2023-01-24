import { Request, Response} from "express";
import { getAllJSDocTags } from "typescript";
import request from "../models/request";


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function getAllRequests (req:Request, res:Response): void {
    request.find({}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getRequest (req:Request, res:Response): void {
    request.findOne({"id":req.params.id}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getRequestByUser (req:Request, res:Response): void {
    request.findOne({"idOwner":req.params.idOwner}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getRequestByCat (req:Request, res:Response): void {
    request.findOne({"idOwner":req.params.idOwner}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function newRequest (req:Request, res:Response): void {
    const request_1 = new request({
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
    })
}


function updateRequest (req:Request, res:Response): void {
    const id = req.params.id;
    const cat: String = req.body.cat;
    const user: String = req.body.user;
    const state: String = req.body.state;
    const validation: String = req.body.validation;


    request.update({"id": id}, {$set: {"id": id, "cat": cat, "user": user, "state": state, "validation": validation}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


function deleteRequest(req:Request, res:Response): void {
    const { id } = req.params;
    request.findOne({"id":req.params.id}).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

export default { getAllRequests, getRequest, newRequest, updateRequest, deleteRequest, getRequestByUser,getRequestByCat };