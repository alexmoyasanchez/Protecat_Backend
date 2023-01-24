"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const denuncia_controller_1 = __importDefault(require("../controllers/denuncia.controller"));
const router = (0, express_1.Router)();
router.get('/', denuncia_controller_1.default.getAllDenuncias);
router.get('/getDenuncia/:id', denuncia_controller_1.default.getDenuncia);
router.post('/new', denuncia_controller_1.default.newDenuncia);
router.put('/update/:id', denuncia_controller_1.default.updateDenuncia);
router.delete('/delete/:id', denuncia_controller_1.default.deleteDenuncia);
exports.default = router;
