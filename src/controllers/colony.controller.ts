import { Request, Response } from "express";
import { getAllJSDocTags } from "typescript";
import Cat from "../models/cat";
import Colony from "../models/colony";


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function getAllColonies(req: Request, res: Response): void {
    Colony.find({}).populate('cats').then((data) => {
        let status: number = 200;
        if (data == null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getColony(req: Request, res: Response): void {
    Colony.findOne({ "id": req.params.id }).populate('cats').then((data) => {
        let status: number = 200;
        if (data == null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getColonyByName(req: Request, res: Response): void {
    Colony.findOne({ "name": req.params.name }).then((data) => {
        let status: number = 200;
        if (data == null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function newColony(req: Request, res: Response): void {
    const colony_1 = new Colony({
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
    })
}


function updateColony(req: Request, res: Response): void {
    const id = req.params.id;
    const name: String = req.body.name;
    const locationx: String = req.body.locationx;
    const locationy: String = req.body.locationy;
    const observations: String = req.body.observations;
    const cats: String = req.body.cats;


    Colony.updateOne({ "id": id }, { $set: { "id": id, "name": name, "locationx": locationx, "locationy": locationy, "observations": observations, "cats": cats } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

async function addCat(req: Request, res: Response): Promise<void> {

    const colony = await Colony.findOne({ "id": req.params.id }).populate('_id');
    const colony0 = await Colony.findOne({ "id": "0" }).populate('_id');

    await Colony.updateOne({ id: req.params.id }, { $push: { cats: req.params.cat } }).then(async (data) => {
        await Cat.updateOne({ _id: req.params.cat }, { $push: { colony: colony?._id } });
        await Colony.updateOne({ id: "0" }, { $pull: { cats: req.params.cat } });
        await Cat.updateOne({ _id: req.params.cat }, { $pull: { colony: colony0?._id } });
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


function deleteColony(req: Request, res: Response): void {
    const { id } = req.params;
    Colony.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

async function removeCatOfColony2(req: Request, res: Response): Promise<void> {

    const cat = await Cat.findOne({ "id": req.params.idCat }).populate('_id');
    const colony = await Colony.findOne({ "id": req.params.id }).populate('_id');


    await Cat.updateOne({ id: req.params.idCat }, { $pull: { colony: colony?._id } });

    await Colony.updateOne({ id: req.params.id }, { $pull: { cats: cat?._id } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

async function removeCatOfColony(req: Request, res: Response): Promise<void> {

    const cat = await Cat.findOne({ "id": req.params.idCat }).populate('_id');
    const colony = await Colony.findOne({ "id": req.params.id }).populate('_id');
    const colony0 = await Colony.findOne({ "id": "0" }).populate('_id');


    await Cat.updateOne({ id: req.params.idCat }, { $push: { colony: colony0?._id } });
    await Cat.updateOne({ id: req.params.idCat }, { $pull: { colony: colony?._id } });
    await Colony.updateOne({ id: "0" }, { $push: { cats: cat?._id } });

    await Colony.updateOne({ id: req.params.id }, { $pull: { cats: cat?._id } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}



export default { getAllColonies, getColony, newColony, updateColony, addCat, deleteColony, getColonyByName, removeCatOfColony, removeCatOfColony2 };