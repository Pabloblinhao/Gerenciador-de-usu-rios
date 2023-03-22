"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = (0, express_1.Router)();
router.get('/users', UserController_1.default.get);
router.post('/users', UserController_1.default.post);
router.put('/users/:id', UserController_1.default.put);
router.delete('/users/:id', UserController_1.default.delete);
exports.default = router;
