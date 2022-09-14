import logo from './assets/logo.svg';
import './styles/App.css';

import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
    
    class Task {
        constructor(name = 'test', description, isComplete = false,  id) {
            this.id = id || new Date().getTime();
            this.name = name;
            this.description = description ||  'test Descr';
            this.isComplete = false;
        }
    }
    
    const [tasks, setTasks] = useState([]);
    const addTask = (task) => {
        setTasks( (arr) => [...arr, task] );
    }
    
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddTask = () => {
        
        addTask(new Task())
        handleClose();
    }
    
    return (
        <div className="App">
            <h2>My Tasks</h2>
            <Card style={{ width: '50%', margin: '0 auto' }}>
                <Card.Header>
                    <h3 className="float-start">All tasks</h3>
                    <Button variant="primary" className="float-end" onClick={handleShow}>Add task</Button>
                </Card.Header>
                <Card.Body>
                    
                    <div>
                        {tasks.map( e =>
                            <li key={e.id}>{ e.name }</li>
                        )}
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddTask}>
                            Add
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;
