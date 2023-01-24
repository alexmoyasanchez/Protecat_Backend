"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = void 0;
exports.SECRET = process.env.MONGODB_PASSWORD;
exports.default = {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://dbUser:dbUserPassword@cluster0.dzg6qgo.mongodb.net/test',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD,
    },
    CADUCIDAD_TOKEN: process.env.CADUCIDAD_TOKEN = '48h',
    SEED_AUTENTICACION: process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION || 'este-es-el-seed-desarrollo',
};
