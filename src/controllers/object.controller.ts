import { Request, Response} from "express";
import { getAllJSDocTags } from "typescript";
import Object from "../models/object";


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function getAllObjects (req:Request, res:Response): void {
    Object.find({}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getObject (req:Request, res:Response): void {
    Object.findOne({"id":req.params.id}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getObjectByName (req:Request, res:Response): void {
    Object.findOne({"name":req.params.name}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


function newObject (req:Request, res:Response): void {
    const object_1 = new Object({
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
    })
}


function updateObject (req:Request, res:Response): void {
    const id = req.params.id;
    const name: String = req.body.name;
    const imageUrl: String = req.body.imageUrl;
    const price: String = req.body.price;
    const description: String = req.body.description;
    const units: String = req.body.units;


    Object.update({"id": id}, {$set: {"id": id, "name": name, "imageUrl": imageUrl, "price": price, "description": description, "units": units}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


function deleteObject(req:Request, res:Response): void {
    const { id } = req.params;
    Object.findOne({"id":req.params.id}).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

async function subUnit (req:Request, res:Response): Promise<void> {
    
    const object = await Object.findOne({id: req.params.id}).populate("units");

    Object.updateOne({"id": req.params.id}, {$set: {"units": parseInt(object["units"]) - 1}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

async function addUnit (req:Request, res:Response): Promise<void> {
    
    const object = await Object.findOne({id: req.params.id}).populate("units");


    Object.updateOne({"id": req.params.id}, {$set: {"units": parseInt(object["units"]) + 1}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

export default { getAllObjects, getObject, newObject, updateObject , deleteObject, getObjectByName, subUnit, addUnit};