"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const objectSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    units: {
        type: Number
    }
});
exports.default = (0, mongoose_1.model)('Object', objectSchema);
