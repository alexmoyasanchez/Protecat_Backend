"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mensaje_controller_1 = __importDefault(require("../controllers/mensaje.controller"));
const router = (0, express_1.Router)();
router.get('/', mensaje_controller_1.default.getAllMensajes);
router.post('/new', mensaje_controller_1.default.newMensaje);
router.delete('/delete', mensaje_controller_1.default.deleteChat);
exports.default = router;
