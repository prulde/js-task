"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("express");
const router = new Router();
const taskRouter_1 = __importDefault(require("./taskRouter"));
router.use("/task", taskRouter_1.default);
exports.default = router;
