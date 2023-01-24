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
exports.checkExistingRole = exports.checkExistingUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const role_1 = require("../models/role");
const checkExistingUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield user_1.default.findOne({ username: req.body.username });
        if (userFound)
            return res.status(400).json({ message: "The user already exists" });
        const email = yield user_1.default.findOne({ email: req.body.email });
        if (email)
            return res.status(400).json({ message: "The email already exists" });
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Error" });
    }
});
exports.checkExistingUser = checkExistingUser;
const checkExistingRole = (req, res, next) => {
    req.body.roles.find();
    if (!req.body.roles)
        return res.status(400).json({ message: "No roles" });
    for (let i = 0; i < req.body.roles.length; i++) {
        if (!role_1.ROLES.includes(req.body.roles[i])) {
            return res.status(400).json({
                message: `Role ${req.body.roles[i]} does not exist`,
            });
        }
    }
    next();
};
exports.checkExistingRole = checkExistingRole;
