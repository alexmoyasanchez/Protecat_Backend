"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bar_controller_1 = __importDefault(require("../controllers/bar.controller"));
const router = (0, express_1.Router)();
router.get('/', bar_controller_1.default.getAllBares);
router.get('/getBar/:id', bar_controller_1.default.getBar);
router.get('/getBaresByUser/:idOwner', bar_controller_1.default.getBarByUser);
router.get('/getBarByName/:name', bar_controller_1.default.getBarByName);
router.post('/new', bar_controller_1.default.newBar);
router.put('/update/:id', bar_controller_1.default.updateBar);
router.delete('/delete/:id', bar_controller_1.default.deleteBar);
exports.default = router;
