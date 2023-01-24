"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const router = (0, express_1.Router)();
router.get('/', post_controller_1.default.getAllPosts);
router.get('/getPost/:id', post_controller_1.default.getPost);
router.post('/new', post_controller_1.default.newPost);
router.put('/update/:id', post_controller_1.default.updatePost);
router.delete('/delete/:id', post_controller_1.default.deletePost);
router.put('/like/:idUser/:idPost', post_controller_1.default.giveLike);
router.put('/undoLike/:idUser/:idPost', post_controller_1.default.undoLike);
router.get('/checkLike/:idUser', post_controller_1.default.checkLike);
exports.default = router;
