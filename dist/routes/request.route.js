"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_controller_1 = __importDefault(require("../controllers/request.controller"));
const router = (0, express_1.Router)();
router.get('/', request_controller_1.default.getAllRequests);
router.get('/getRequest/:id', request_controller_1.default.getRequest);
router.get('/getRequestByUser/:idOwner', request_controller_1.default.getRequestByUser);
router.get('/getRequestByCat/:idOwner', request_controller_1.default.getRequestByCat);
router.post('/new', request_controller_1.default.newRequest);
router.put('/update/:id', request_controller_1.default.updateRequest);
router.delete('/delete/:id', request_controller_1.default.deleteRequest);
exports.default = router;
