"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const valoracion_controller_1 = __importDefault(require("../controllers/valoracion.controller"));
const router = (0, express_1.Router)();
router.get('/', valoracion_controller_1.default.getAllValoraciones);
router.get('/getValoracion/:id', valoracion_controller_1.default.getValoracion);
router.get('/getValoracionesByBar/:idBar', valoracion_controller_1.default.getValoracionesByBar);
router.post('/new', valoracion_controller_1.default.newValoracion);
router.put('/update/:id', valoracion_controller_1.default.updateValoracion);
router.delete('/delete/:id', valoracion_controller_1.default.deleteValoracion);
exports.default = router;
