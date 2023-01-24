"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../controllers/usuario.controller"));
const router = (0, express_1.Router)();
router.get('/', usuario_controller_1.default.getAllUsuarios);
router.get('/getUsuario/:id', usuario_controller_1.default.getUsuario);
router.get('/getUsuarioByEmail/:email', usuario_controller_1.default.getUsuarioByEmail);
router.get('/getUsuarioByUsername/:username', usuario_controller_1.default.getUsuarioByUsername);
router.post('/new', usuario_controller_1.default.newUsuario);
router.put('/update/:id', usuario_controller_1.default.updateUsuario);
router.delete('/delete/:id', usuario_controller_1.default.deleteUsuario);
router.post('/login', usuario_controller_1.default.LogIn);
router.put('/updatePuntuacion/:id/:puntos', usuario_controller_1.default.updatePuntuacion);
exports.default = router;
