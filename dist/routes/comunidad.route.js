"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comunidad_controller_1 = __importDefault(require("../controllers/comunidad.controller"));
const router = (0, express_1.Router)();
router.get('/', comunidad_controller_1.default.getAllComunidades);
router.get('/getComunidad/:id', comunidad_controller_1.default.getComunidad);
router.get('/getComunidadesByUser/:idOwner', comunidad_controller_1.default.getComunidadByUser);
router.get('/getComunidadByName/:name', comunidad_controller_1.default.getComunidadByName);
router.post('/new', comunidad_controller_1.default.newComunidad);
router.put('/update/:id', comunidad_controller_1.default.updateComunidad);
router.delete('/delete/:id', comunidad_controller_1.default.deleteComunidad);
router.put('/addUsuario/:idUsuario/comunidad/:idComunidad', comunidad_controller_1.default.unirmeComunidad);
router.put('/deleteUsuario/:idUsuario/comunidad/:idComunidad', comunidad_controller_1.default.abandonarComunidad);
exports.default = router;
