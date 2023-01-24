"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bar_controller_1 = __importDefault(require("../controllers/bar.controller"));
const router = express_1.Router();
router.get('/', bar_controller_1.default.getAllBares);
router.get('/:id', bar_controller_1.default.getBar);
router.post('/new', bar_controller_1.default.newBar);
router.put('/update/:id', bar_controller_1.default.updateBar);
router.delete('/:id', bar_controller_1.default.deleteBar);
exports.default = router;
