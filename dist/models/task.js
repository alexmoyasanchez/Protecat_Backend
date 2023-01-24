"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    date: {
        type: Date
    },
    subject: {
        type: String
    },
    description: {
        type: String
    },
    done: {
        type: Boolean
    },
    volunteer: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }]
});
exports.default = (0, mongoose_1.model)('Task', taskSchema);
