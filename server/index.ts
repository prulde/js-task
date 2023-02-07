import "dotenv/config";
import "express";
import express, { Express, Request, Response } from 'express';
import cors from "cors";
import sequelize from "./db";
import router from "./routes/index";

const models = require("./models/models");

const port = process.env.PORT || 8000;

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/:universalURL", (req: Request, res: Response) => {
	res.send("404 URL NOT FOUND");
});

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(port, (): void => {
			console.log("server started on port " + port);
		});

	} catch (e) {
		console.log(e);
		//throw (e);
	}
};

start();