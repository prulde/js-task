import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Button, Container, Modal, Form } from "react-bootstrap";
import taskAPI from "./taskApi/task";
import Forms from "./form/form";


function App() {


	useEffect(() => {
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<Forms.LoadTasks />
			</header>
		</div >
	);
}

export default App;
