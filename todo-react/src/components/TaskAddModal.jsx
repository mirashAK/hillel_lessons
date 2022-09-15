import React from 'react';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function TaskAddModal({ show, onHide, onSubmit }) {
    
    const taskNameRef = React.createRef();
    const taskDescreRef = React.createRef();

    const handleAddTask = ()=>{
        onSubmit({
            name: taskNameRef.current.value, 
            description: taskDescreRef.current.value
        }); 
    }
    
    return (
        <Modal show={show} onHide={onHide}>
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
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAddTask}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
