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
exports.isAdmin = exports.isUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).json({ message: "No token provided" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        req.userId = decoded.id;
        const user = yield user_1.default.find({ id: req.params.userId }, { password: 0 });
        if (!user)
            return res.status(404).json({ message: "No user found" });
        next();
        return;
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
});
exports.verifyToken = verifyToken;
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.userId).populate('roles');
        const roles = yield role_1.default.find({ _id: { $in: user === null || user === void 0 ? void 0 : user.roles } });
        for (let i = 0; i < roles.length; i++) {
            console.log(roles[i].name);
            if (roles[i].name === "standard") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Require Standard Role!" });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.isUser = isUser;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.params.userId });
        const roles = yield role_1.default.find({ _id: { $in: user === null || user === void 0 ? void 0 : user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Require Admin Role!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
});
exports.isAdmin = isAdmin;
