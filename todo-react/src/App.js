// import logo from './assets/logo.svg';
import './styles/App.css';

import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Trash } from 'react-bootstrap-icons';

function App() {
    
    class Task {
        constructor(name = 'test', description, isCompleted = false,  id) {
            this.id = id || new Date().getTime();
            this.name = name;
            this.description = description ||  'test Descr';
            this.isCompleted = true;
        }
    }
    
    const [tasks, setTasks] = useState([]);
    const addTask = (task) => {
        setTasks( (arr) => [...arr, task] );
    }
    
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const taskNameRef = React.createRef();
    const taskDescreRef = React.createRef();
    
    const handleAddTask = () => {
        console.log(`taskNameRef: `, taskNameRef.current.value);
        addTask(new Task(taskNameRef.current.value, taskDescreRef.current.value))
        handleClose();
    }
    
    const onChangeCompleted  = (taskId) => {
        const taskIndex = tasks.findIndex((task) => task.id === taskId)
        const updatedTask = [...tasks]
        updatedTask[taskIndex].isCompleted = !updatedTask[taskIndex].isCompleted
        setTasks(updatedTask);
    }
    
    const onRemoveTask  = (taskId) => {
        const updatedTask = tasks.reduce((acc, task)=>{
            if (task.id !== taskId) acc.push(task);
            return acc;
        }, [])
        setTasks(updatedTask);
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
                    
                    <ListGroup>
                        {tasks.map( (task) =>
                            <ListGroup.Item as="li" key={task.id}>
                                <Card>
                                    <Card.Header>
                                        <label className="task-name float-start">
                                            <input
                                                type="checkbox" 
                                                className="form-check-input task-complete"
                                                checked={task.isCompleted}
                                                onChange={e => onChangeCompleted(task.id)}/>{ task.name }
                                        </label>
                                        <Button className="float-end" variant="danger" onClick={e => onRemoveTask(task.id)}><Trash /></Button>
                                    </Card.Header>
                                    <Card.Body>{ task.description }</Card.Body>
                                </Card>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Task name: </Form.Label>
                                <Form.Control ref={taskNameRef} type="text" placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Task description: </Form.Label>
                                <Form.Control ref={taskDescreRef} as="textarea" rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
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
