"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    cat: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cat'
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String
    },
    validation: {
        type: String
    }
});
exports.default = (0, mongoose_1.model)('Request', requestSchema);
