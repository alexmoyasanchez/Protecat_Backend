import { Request, Response } from "express";
import { NativeError } from "mongoose";
import { getAllJSDocTags } from "typescript";
import Task from "../models/task";
import User from "../models/user";



const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function getAllTasks(req: Request, res: Response): void {
    Task.find({}).populate('volunteer').then((data) => {
        let status: number = 200;
        if (data == null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getTask(req: Request, res: Response): void {
    Task.findById(req.params.id).then((data) => {
        let status: number = 200;
        if (data == null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function getTaskByUser(req: Request, res: Response): void {

    User.findOne({ "email": req.params.email }).populate('tasks').then((data) => {
        let status: number = 200;
        if (data == null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}


async function newTask(req: Request, res: Response): Promise<void> {

    const user = await User.findOne({ "username": req.body.volunteer }).populate('_id')
    console.log(user._id);
    const task = new Task({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "date": new Date(req.body.date),
        "subject": req.body.subject,
        "description": req.body.description,
        "done": false,
        "volunteer": await User.findOne({ "username": req.body.volunteer }),
    });

    task.save().then(async (data) => {
        const task2 = await Task.findOne({id: task.id}).populate("_id");
        await Task.updateOne({ _id: task2._id }, { $push: { volunteer: user?._id } });
        await User.updateOne({ username: req.body.volunteer }, { $push: { tasks: task2._id } })

        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


async function updateTask(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const date = req.body.date;
    const subject = req.body.subject;
    const description = req.body.description;

    Task.update({ "id": id }, { $set: { "id": id, "date": date, "subject": subject, "description": description } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

async function taskDone(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const done = true;

    Task.update({ "id": id }, { $set: { "id": id, "done": done } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

async function taskNotDone(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const done = false;

    Task.update({ "id": id }, { $set: { "id": id, "done": done } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

async function assignTask(req: Request, res: Response): Promise<void> {

    const task2 = await Task.findOne({ "id": req.params.id });

    User.updateOne({ "_id": req.params.user }, { $push: { "tasks": task2?._id } });

    Task.updateOne({ id: req.params.id }, { $set: { volunteer: req.params.user } }).then((data) => {
        res.status(201).json(data);
    })

}

async function deleteTask(req: Request, res: Response): Promise<void> {

    Task.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

export default { getAllTasks, getTask, getTaskByUser, newTask, updateTask, taskDone, taskNotDone, assignTask, deleteTask };

function handleError(err: NativeError): void {
    throw new Error("Function not implemented.");
}
