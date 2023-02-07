import sequelize from "../db";
import { DataTypes } from "sequelize";

const task = sequelize.define("task", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	description: { type: DataTypes.TEXT },
	status: { type: DataTypes.BOOLEAN, defaultValue: false } // isHidden
});

export default { task };