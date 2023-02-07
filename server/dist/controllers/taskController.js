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
const db_1 = __importDefault(require("../db"));
class taskController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskData = {
                name: req.body.name,
                description: req.body.description
            };
            const task = yield db_1.default.models.task.create(taskData);
            return res.json(task);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const task = yield db_1.default.models.task.destroy({ where: { id } });
            return res.json(task);
        });
    }
    getCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield db_1.default.models.task.findAll({ where: { status: "true" } });
            return res.json(tasks);
        });
    }
    getUncompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield db_1.default.models.task.findAll({ where: { status: "false" } });
            return res.json(tasks);
        });
    }
    change(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskData = {
                id: req.params.id,
                name: req.body.name,
                description: req.body.description,
                status: req.body.status
            };
            const task = yield db_1.default.models.task.findOne({ where: { id: taskData.id } });
            if (task) {
                task.update({ description: taskData.description, name: taskData.name, status: taskData.status });
            }
            return res.json(task);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield db_1.default.models.task.findAll();
            return res.json(tasks);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const task = yield db_1.default.models.task.findOne({ where: { id } });
            return res.json(task);
        });
    }
    markAsCompleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const task = yield db_1.default.models.task.findOne({ where: { id } });
            if (task) {
                yield task.update({ status: "true" }); // if true - may be hidden
            }
            return res.json(task);
        });
    }
}
exports.default = new taskController;
