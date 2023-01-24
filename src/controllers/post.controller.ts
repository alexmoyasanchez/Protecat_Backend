import { Request, Response, Router} from "express";
import { getAllJSDocTags, isEmptyBindingElement } from "typescript";
import post from "../models/post";
import User from "../models/user";

function getAllPosts (req:Request, res:Response): void {
    post.find({}).populate('user').then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    })
}

function getPost (req:Request, res:Response): void {
    post.findOne({"id":req.params.id}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })

}


async function newPost (req:Request, res:Response): Promise<void> {
    const post_1 = new post({
        "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
        "user": await User.findOne({"id": req.body.userID}).populate('_id'),
        "text": req.body.text,
        "imageUrl": req.body.imageUrl,
        "date": req.body.date,
        "likes": req.body.likes
    });
    
    post_1.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}


function updatePost (req:Request, res:Response): void {
    const id = req.body.id;
    const userID: String = req.body.userID;
    const text: String = req.body.text;
    const imageUrl: String = req.body.imageUrl;
    const date: String = req.body.date;
    const likes: Number = req.body.likes;
    

    post.update({"id": id}, {$set: {"id": id,"userID": userID, "text": text, "imageUrl": imageUrl, "date": date, "likes": likes}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


function deletePost(req:Request, res:Response): void {
    const { id } = req.params;
    post.findOne({"id":req.params.id}).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

async function giveLike(req:Request, res:Response): Promise<void>{   

    await post.updateOne({"id": req.params.idPost}, {$addToSet: {"likes": req.params.idUser}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}


async function undoLike(req:Request, res:Response): Promise<void>{   

    await post.updateOne({"id": req.params.idPost}, {$pull: {"likes": req.params.idUser}}).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    })
}

async function checkLike(req:Request, res:Response): Promise<void>{  

    const user2 = User.findOne({'id': req.params.idUser}).then((data)=>{
        let status: number = 200;
        if(data==null) status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}



export default { getAllPosts, getPost, newPost, updatePost , deletePost, giveLike, undoLike, checkLike};