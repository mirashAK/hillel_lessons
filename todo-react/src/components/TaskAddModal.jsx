import React, { useState, forwardRef, useImperativeHandle} from 'react';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TaskAddModal = forwardRef((props, ref) => {
    
    const { onSubmit } = props;
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useImperativeHandle(ref, () => ({
        show() {
            handleShow();
        },
        hide() {
            handleClose();
        }
    }));
    
    const taskNameRef = React.createRef();
    const taskDescreRef = React.createRef();

    const handleAddTask = ()=>{
        onSubmit({
            name: taskNameRef.current.value, 
            description: taskDescreRef.current.value
        }); 
    }
    
    return (
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
    );
});

export default TaskAddModal;
