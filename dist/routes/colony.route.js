"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colony_controller_1 = __importDefault(require("../controllers/colony.controller"));
const authJWT_1 = require("../middelware/authJWT");
const router = (0, express_1.Router)();
router.get('/:userId', colony_controller_1.default.getAllColonies);
router.get('/getColony/:id', colony_controller_1.default.getColony);
router.get('/getColonyByName/:name', colony_controller_1.default.getColonyByName);
router.post('/new/:userId', [authJWT_1.isAdmin], colony_controller_1.default.newColony);
router.put('/update/:id/:userId', [authJWT_1.isAdmin], colony_controller_1.default.updateColony);
router.put('/addCat/:id/:cat/:userId', [authJWT_1.isAdmin], colony_controller_1.default.addCat);
router.delete('/delete/:id/:userId', [authJWT_1.isAdmin], colony_controller_1.default.deleteColony);
router.put('/removeCatOfColony/:id/:idCat/:userId', [authJWT_1.isAdmin], colony_controller_1.default.removeCatOfColony);
exports.default = router;
