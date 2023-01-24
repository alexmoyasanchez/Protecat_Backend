"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_controller_1 = __importDefault(require("../controllers/cat.controller"));
const authJWT_1 = require("../middelware/authJWT");
const router = (0, express_1.Router)();
router.get('/', cat_controller_1.default.getAllCats);
router.get('/getCat/:id', cat_controller_1.default.getCat);
router.get('/getCatByName/:name', cat_controller_1.default.getCatByName);
router.post('/new/:userId', [authJWT_1.isAdmin], cat_controller_1.default.newCat);
router.put('/update/:id/:userId', [authJWT_1.isAdmin], cat_controller_1.default.updateCat);
router.delete('/delete/:id/:userId', [authJWT_1.isAdmin], cat_controller_1.default.deleteCat);
exports.default = router;
