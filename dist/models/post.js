"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String
    },
    imageUrl: {
        type: String
    },
    date: {
        type: String
    },
    likes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }]
});
exports.default = (0, mongoose_1.model)('Post', postSchema);
