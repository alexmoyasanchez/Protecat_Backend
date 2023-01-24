import { Request, Response} from "express";
import User from "../models/user";
import Role from "../models/role";

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

function getAllUsers (req:Request, res:Response): void {
    User.find({}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getUser (req:Request, res:Response): void {
    User.findOne({"id":req.params.id}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getUserByUsername (req:Request, res:Response): void {
    User.findOne({"username":req.params.username}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getUserByEmail (req:Request, res:Response): void {
    User.findOne({"email":req.params.email}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getUserById (req:Request, res:Response): void {
    User.findById(req.params.id).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

async function newUser (req:Request, res:Response): Promise<void> {

    const id = Math.floor(Math.random() * (10000000 - 1 + 1) + 1);
    const { username, password, email, imageUrl, tasks } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new User({ id, username, password: hashed, email, imageUrl});
    const roleadded = await Role.findOne({name: "standard"});
    newUser.roles = roleadded?._id;
    await newUser.save();
    res.status(200);
}


function updateUser (req:Request, res:Response): void {
    const id = req.params.id;
    const username: String = req.body.username;
    const password: String = req.body.password;
    const email: String = req.body.email;
    const imageUrl: String = req.body.imageUrl;
    const tasks: String = req.body.tasks;


    User.update({"id": id}, {$set: {"id": id, "username": username, "password": password, "email": email, "imageUrl": imageUrl, "tasks": tasks}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


function deleteUser(req:Request, res:Response): void {

    User.findOne({"id":req.params.id}).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


function LogIn (req:Request, res:Response): void {
    
    let body = req.body;
    //erro y usuarioDB any(?)
    
    User.findOne({ email: body.email }, async (erro: any, userDB: { password: any; })=>{
        if (erro) {
          return res.status(500).json({
             ok: false,
             err: erro
          })
       }
   // Verifica que exista un usuario con el mail escrito por el usuario.
      if (!userDB) {
         return res.status(401).json({
           ok: false,
           err: {
               message: "Usuario o contraseña incorrectos"
           }
        })
      }

      const matchPassword = await bcrypt.compare(body.password, userDB.password)
   // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!matchPassword){
         return res.status(400).json({
            ok: false,
            err: {
              message: "Usuario o contraseña incorrectos"
            }
         });
      }
   // Genera el token de autenticación
       let token = jwt.sign({
              user: userDB,
           }, process.env.SEED_AUTENTICACION, {
           expiresIn: process.env.CADUCIDAD_TOKEN
       })
       res.json({
           ok: true,
           user: userDB,
           token,
       })
   })  
}

function getTasks (req:Request, res:Response): void {
    //Buscamos al usuario por su ID, y después obtenemos las tareas de este usuario
    User.findById(req.params.id).populate('tasks').then((data)=>{
        //Por defecto se devuelve un código 200 indicando que la búsqueda ha sido correcta
        let status: number = 200;
        //En caso de que no se encuentre ninguna tarea del usuario se refiere con un código 404
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        //En caso de que suceda un error se notifica con un código 500 
        return res.status(500).json(err);
    })
}

async function addPermission (req:Request, res:Response): Promise<void> {

    const roleadded = await Role.findOne({name: "admin"});


    User.updateOne({"id": req.params.id}, {$push: {"roles": roleadded?._id}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

export default { getAllUsers, getUser, getUserByEmail, getUserById, newUser, updateUser , deleteUser, LogIn, getUserByUsername, getTasks, addPermission};