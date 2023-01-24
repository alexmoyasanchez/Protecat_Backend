"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const colonySchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    locationx: {
        type: String
    },
    locationy: {
        type: String
    },
    observations: {
        type: String
    },
    cats: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Cat'
        }]
});
exports.default = (0, mongoose_1.model)('Colony', colonySchema);
