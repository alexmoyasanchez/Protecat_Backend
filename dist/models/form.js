"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const formSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String
    }
});
exports.default = (0, mongoose_1.model)('Form', formSchema);
