"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const object_controller_1 = __importDefault(require("../controllers/object.controller"));
const authJWT_1 = require("../middelware/authJWT");
const router = (0, express_1.Router)();
router.get('/', object_controller_1.default.getAllObjects);
router.get('/getObject/:id', object_controller_1.default.getObject);
router.get('/getObjectByName/:name', object_controller_1.default.getObjectByName);
router.post('/new/:userId', [authJWT_1.isAdmin], object_controller_1.default.newObject);
router.put('/update/:id/:userId', [authJWT_1.isAdmin], object_controller_1.default.updateObject);
router.delete('/delete/:id/:userId', [authJWT_1.isAdmin], object_controller_1.default.deleteObject);
router.put('/subUnit/:id/:userId', [authJWT_1.isAdmin], object_controller_1.default.subUnit);
router.put('/addUnit/:id/:userId', [authJWT_1.isAdmin], object_controller_1.default.addUnit);
exports.default = router;
