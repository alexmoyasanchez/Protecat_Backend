import { Request, Response} from "express";
import { getAllJSDocTags } from "typescript";
import Cat from "../models/cat";
import Colony from "../models/colony";


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function getAllCats (req:Request, res:Response): void {
    Cat.find({}).populate('colony').then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getCat (req:Request, res:Response): void {
    //Primero se busca el gato por el ID enviado (req.params.id)
    Cat.findOne({"id":req.params.id}).then((data)=>{
        //Por defecto iguala el status a 200, que significa que la búsqueda ha sido correcta
        let status: number = 200;
        //Si no se encuentra el gato (data == null), iguala el status a 404, que indica que no lo ha encontrado
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        //Si la búsqueda ha desencadenado un error devuelve al usuario un código 500.
            return res.status(500).json(err);
    })
}

function getCatByName (req:Request, res:Response): void {
    Cat.findOne({"name":req.params.name}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

async function newCat (req:Request, res:Response): Promise<void> {
    const cat_1 = new Cat({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "name": req.body.name,
        "sex": req.body.sex,
        "weight": req.body.weight,
        "compatibilities": req.body.compatibilities,
        "incompatibilities": req.body.incompatibilities,
        "diseases": req.body.diseases,
        "imageUrl": req.body.imageUrl,
        "colony": await Colony.findOne({id:"0"})        
    });

    const cat1 = await Cat.findOne({id: cat_1.id}).populate("_id");
    await Colony.updateOne({name : "Sin colonia asignada"}, {$push: {cats: cat_1?._id}});
    

    
    cat_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


function updateCat (req:Request, res:Response): void {
    const id = req.params.id;
    const name: String = req.body.name;
    const sex: String = req.body.sex;
    const weight: Number = req.body.weight;
    const compatibilities: String = req.body.compatibilities;
    const incompatibilities: String = req.body.incompatibilities;
    const diseases: String = req.body.diseases;
    const imageUrl: String = req.body.imageUrl;
    const colony: String = req.body.colony;


    Cat.update({"id": id}, {$set: {"id": id, "name": name,"sex": sex, "weight":weight, "compatibilities":compatibilities, "incompatibilities":incompatibilities, "diseases":diseases, "imageUrl":imageUrl, "colony":colony}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


function deleteCat(req:Request, res:Response): void {
    const { id } = req.params;
    Cat.findOne({"id":req.params.id}).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


export default { getAllCats, getCat, newCat, updateCat , deleteCat, getCatByName };