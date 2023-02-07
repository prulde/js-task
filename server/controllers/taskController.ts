import { Response, Request } from "express";
import sequelize from "../db";

class taskController {
	async create(req: Request, res: Response) {
		const taskData = {
			name: req.body.name,
			description: req.body.description
		};
		const task = await sequelize.models.task.create(taskData);

		return res.json(task);
	}

	async delete(req: Request, res: Response) {
		const id = req.params.id;
		const task = await sequelize.models.task.destroy({ where: { id } });

		return res.json(task);
	}

	async getCompleted(req: Request, res: Response) {
		const tasks = await sequelize.models.task.findAll({ where: { status: "true" } });

		return res.json(tasks);
	}

	async getUncompleted(req: Request, res: Response) {
		const tasks = await sequelize.models.task.findAll({ where: { status: "false" } });

		return res.json(tasks);
	}

	async change(req: Request, res: Response) {
		const taskData = {
			id: req.params.id,
			name: req.body.name,
			description: req.body.description,
			status: req.body.status
		};
		const task = await sequelize.models.task.findOne({ where: { id: taskData.id } });
		if (task) {
			task.update({ description: taskData.description, name: taskData.name, status: taskData.status });
		}

		return res.json(task);
	}

	async getAll(req: Request, res: Response) {
		const tasks = await sequelize.models.task.findAll();
		return res.json(tasks);
	}

	async getOne(req: Request, res: Response) {
		const id = req.params.id;
		const task = await sequelize.models.task.findOne({ where: { id } });
		return res.json(task);
	}

	async markAsCompleted(req: Request, res: Response) { //merge
		const id = req.params.id;
		const task = await sequelize.models.task.findOne({ where: { id } });
		if (task) {
			await task.update({ status: "true" }); // if true - may be hidden
		}

		return res.json(task);
	}
}

export default new taskController;