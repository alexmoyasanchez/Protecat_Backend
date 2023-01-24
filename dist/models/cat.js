"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const catSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    sex: {
        type: String
    },
    weight: {
        type: String
    },
    compatibilities: {
        type: String
    },
    incompatibilities: {
        type: String
    },
    diseases: {
        type: String
    },
    imageUrl: {
        type: String
    },
    colony: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Colony'
        }]
});
exports.default = (0, mongoose_1.model)('Cat', catSchema);
