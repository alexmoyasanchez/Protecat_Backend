"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const usuario_1 = __importDefault(require("./usuario"));
const comunidadSchema = new mongoose_1.Schema({
    id: {
        type: String, unique: true
    },
    name: {
        type: String, unique: true
    },
    owner: {
        type: String,
        ref: usuario_1.default
    },
    idOwner: {
        type: String,
        ref: usuario_1.default
    },
    usuarios: [{
            type: mongoose_1.Schema.Types.String,
            ref: usuario_1.default
        }],
    descripcion: {
        type: String
    },
    imageUrl: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Comunidad', comunidadSchema);
