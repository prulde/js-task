import React, { InputHTMLAttributes, FC, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Card, CardGroup, Accordion, Container } from "react-bootstrap";
import taskAPI from "../taskApi/task";
import task from "../taskApi/task";


function CreateTask({ show, onHide, shouldUpdate }: any) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	function addTask() {
		taskAPI.createTask({ name: name, description: description })
			.then(data => {
				setName('');
				setDescription('');
				shouldUpdate();
			});
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new task
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Control
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder={"Enter task name here"}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder={"Write description name here"}
							as="textarea"
							rows={3}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>Close</Button>
				<Button variant="outline-success" onClick={addTask}>Create</Button>
			</Modal.Footer>
		</Modal>
	);
};

function DeleteVerification({ show, onHide, shouldUpdate, getID }: any) {
	function deleteTask() {
		taskAPI.deleteTask(getID())
			.then(data => {
				shouldUpdate();
			});
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Are you sure you want to delete this task?
				</Modal.Title>
			</Modal.Header>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>Close</Button>
				<Button variant="outline-success" onClick={deleteTask}>Delete</Button>
			</Modal.Footer>
		</Modal>
	);
};

function ChangeTask({ show, onHide, shouldUpdate, getName, getDescription, getID }: any) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [id, setID] = useState<any>(null);

	function setInitialData() {
		setID(getID());
		setName(getName());
		setDescription(getDescription());
	}

	function changeTask(status: boolean = false) {
		taskAPI.changeTask({ id: id, name: name, description: description, status: status })
			.then(data => {
				setName('');
				setDescription('');
				setID(null);
				shouldUpdate();
			});
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			onShow={setInitialData}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Change task
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Control
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder={"Enter task name here"}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder={"Write description name here"}
							as="textarea"
							rows={3}
						/>
					</Form.Group>
					<Button variant="outline-success" onClick={() => { changeTask(true); }}>Mark as completed</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>Close </Button>
				<Button variant="outline-success" onClick={() => { changeTask(); }}>Change </Button>
			</Modal.Footer>
		</Modal>
	);
}

function LoadTasks() {
	const [data, setData] = useState<any[]>([{}]);
	const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
	const [taskVisible, setTaskVisible] = useState<boolean>(false);
	const [changeVisible, setChangeVisible] = useState<boolean>(false);
	const [elementForDelete, setElementForDelete] = useState<any>();
	const [nameForChange, setNameForChange] = useState<any>();
	const [descriptionForChange, setDescriptionForChange] = useState<any>();
	const [idForChange, setIdForChange] = useState<any>();
	const [isHidden, setHidden] = useState<boolean>(false);

	useEffect(() => {
		taskAPI.getAllTasks()
			.then(response => {
				setData(response);
			});
	}, []);

	function loadData() {
		taskAPI.getAllTasks()
			.then(response => {
				setData(response);
			});
	}

	function loadUncompleted() {
		taskAPI.getUncompletedTasks()
			.then(response => {
				setData(response);
			});
	}

	// elementForDelete={element.id}
	//() => { taskAPI.deleteTask(element.id); } // setElementForDelete(element.id); 
	return (
		<div>
			<Accordion>
				{data.map((element, index) => {
					return (
						<Accordion.Item key={index} eventKey={element.id} >
							<Accordion.Header>{element.name}</Accordion.Header>
							<Accordion.Body >
								{element.description}
								<br></br>
								<Button variant="outline-danger" onClick={() => {
									setDeleteVisible(true);
									setElementForDelete(element.id);
								}}>Delete</Button>

								<Button variant="outline-primary" onClick={() => {
									setChangeVisible(true);
									setNameForChange(element.name);
									setDescriptionForChange(element.description);
									setIdForChange(element.id);
								}}>Change</Button>

							</Accordion.Body>
						</Accordion.Item>
					);

				})}
			</ Accordion>
			<br></br>
			<Container className="d-flex flex-column">
				<Button
					onClick={() => setTaskVisible(true)}
				>
					Create new task
				</Button>
				<br></br>
				<Button
					onClick={() => {
						isHidden ? loadData() : loadUncompleted();
						setHidden(isHidden ? false : true);
					}}
				>
					Hide completed tasks
				</Button>
				<CreateTask show={taskVisible} onHide={() => {
					setTaskVisible(false);
				}}
					shouldUpdate={() => {
						setTaskVisible(false);
						isHidden ? loadUncompleted() : loadData();
					}} />

			</Container>



			<DeleteVerification show={deleteVisible}
				onHide={() => {
					setDeleteVisible(false);
				}}
				shouldUpdate={() => {
					setDeleteVisible(false);
					isHidden ? loadUncompleted() : loadData();
				}}
				getID={() => { return elementForDelete; }} />
			{" "}
			<ChangeTask show={changeVisible}
				onHide={() => {
					setChangeVisible(false);

				}}
				shouldUpdate={() => {
					setChangeVisible(false);
					isHidden ? loadUncompleted() : loadData();
				}}
				getName={() => { return nameForChange; }}
				getDescription={() => { return descriptionForChange; }}
				getID={() => { return idForChange; }} />
		</div>
	);
}

export default { CreateTask, LoadTasks };