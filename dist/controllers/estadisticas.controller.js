"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bar_1 = __importDefault(require("../models/bar"));
const comunidad_1 = __importDefault(require("../models/comunidad"));
const usuario_1 = __importDefault(require("../models/usuario"));
const estadisticas_2 = __importDefault(require("../models/estadisticas"));
function getEstadisticas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var numUsuarios = new String;
        var numBares = new String;
        var numComunidades = new String;
        yield estadisticas_2.default.findOne({}).remove().exec();
        yield usuario_1.default.find({}).then((data) => {
            numUsuarios = (data.length).toString();
        });
        yield bar_1.default.find({}).then((data) => {
            numBares = (data.length).toString();
        });
        yield comunidad_1.default.find({}).then((data) => {
            numComunidades = (data.length).toString();
        });
        const estadisticas_1 = new estadisticas_2.default({
            "numUsuarios": numUsuarios,
            "numBares": numBares,
            "numComunidades": numComunidades
        });
        yield estadisticas_1.save();
        yield estadisticas_2.default.find({}).then((data) => {
            let status = 200;
            if (data == null)
                status = 404;
            return res.status(status).json(data);
        }).catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    });
}
exports.default = { getEstadisticas };
