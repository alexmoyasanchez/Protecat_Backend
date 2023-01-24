"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_2 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
function getAllPosts(req, res) {
    post_2.default.find({}).populate('user').then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
}
function getPost(req, res) {
    post_2.default.findOne({ "id": req.params.id }).then((data) => {
        let status = 200;
        if (data == null)
            status = 404;
        return res.status(status).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function newPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const post_1 = new post_2.default({
            "id": Math.floor(Math.random() * (10000000 - 1 + 1) + 1),
            "user": yield user_1.default.findOne({ "id": req.body.userID }).populate('_id'),
            "text": req.body.text,
            "imageUrl": req.body.imageUrl,
            "date": req.body.date,
            "likes": req.body.likes
        });
        post_1.save().then((data) => {
            return res.status(201).json(data);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    });
}
function updatePost(req, res) {
    const id = req.body.id;
    const userID = req.body.userID;
    const text = req.body.text;
    const imageUrl = req.body.imageUrl;
    const date = req.body.date;
    const likes = req.body.likes;
    post_2.default.update({ "id": id }, { $set: { "id": id, "userID": userID, "text": text, "imageUrl": imageUrl, "date": date, "likes": likes } }).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
function deletePost(req, res) {
    const { id } = req.params;
    post_2.default.findOne({ "id": req.params.id }).remove().exec().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}
function giveLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield post_2.default.updateOne({ "id": req.params.idPost }, { $addToSet: { "likes": req.params.idUser } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function undoLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield post_2.default.updateOne({ "id": req.params.idPost }, { $pull: { "likes": req.params.idUser } }).then((data) => {
            res.status(201).json(data);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
}
function checkLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user2 = user_1.default.findOne({ 'id': req.params.idUser }).then((data) => {
            let status = 200;
            if (data == null)
                status = 404;
            return res.status(status).json(data);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    });
}
exports.default = { getAllPosts, getPost, newPost, updatePost, deletePost, giveLike, undoLike, checkLike };
