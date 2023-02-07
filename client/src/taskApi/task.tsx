import axios from "axios";

axios.create({ baseURL: process.env.API_URL });

async function getTask(id: number): Promise<any> {
	return await axios.get<any>("api/task/all/" + id)
		.then((response) => { return response.data; });
}

async function getAllTasks(): Promise<any> {
	return await axios.get<any[]>("api/task/all")
		.then((response) => { return response.data; });
}

async function getCompletedTasks(): Promise<any> {
	return await axios.get<any[]>("api/task/completed")
		.then((response) => { return response.data; });
}

async function getUncompletedTasks(): Promise<any> {
	return await axios.get<any[]>("api/task/uncompleted")
		.then((response) => { return response.data; });
}

async function createTask(task: any): Promise<any> {
	return await axios.post<any>("api/task/all", task)
		.then((response) => { return response.data; });
}

async function deleteTask(id: number | null): Promise<any> {
	return await axios.delete<any>("api/task/all/" + id)
		.then((response) => { return response.data; });
}

async function changeTask(task: any): Promise<any> {
	if (task.status == true) {
		return await axios.put<any>("api/task/all/" + task.id, { status: task.status })
			.then((response) => { return response.data; });
	} else {
		return await axios.put<any>("api/task/all/" + task.id, { name: task.name, description: task.description })
			.then((response) => { return response.data; });
	}


}


export default {
	getTask,
	getAllTasks,
	createTask,
	getCompletedTasks,
	getUncompletedTasks,
	deleteTask,
	changeTask
}; 