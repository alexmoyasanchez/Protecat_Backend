"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicacion_controller_1 = __importDefault(require("../controllers/publicacion.controller"));
const router = express_1.Router();
router.get('/', publicacion_controller_1.default.getAllPublicaciones);
router.get('/getBar/:id', publicacion_controller_1.default.getPublicacion);
router.post('/new', publicacion_controller_1.default.newPublicacion);
router.put('/update/:id', publicacion_controller_1.default.updatePublicacion);
router.delete('/delete/:id', publicacion_controller_1.default.deletePublicacion);
exports.default = router;
