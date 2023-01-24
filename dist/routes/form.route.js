"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_controller_1 = __importDefault(require("../controllers/form.controller"));
const router = (0, express_1.Router)();
router.get('/', form_controller_1.default.getAllForms);
router.get('/getForm/:id', form_controller_1.default.getForm);
router.get('/getFormByUser/:idOwner', form_controller_1.default.getFormByUser);
router.post('/new', form_controller_1.default.newForm);
router.put('/update/:id', form_controller_1.default.updateForm);
router.delete('/delete/:id', form_controller_1.default.deleteForm);
exports.default = router;
