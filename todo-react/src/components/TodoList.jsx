import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import TasksList from './TasksList';
import TaskAddModal from './TaskAddModal';

function TodoList() {
    
    const tasks = useSelector(state => state.todoList.value);

    const taskAddModalRef = useRef();
    const handleShow = () => taskAddModalRef.current.show();

    return (
        <div className="TodoList">
            <h2>My Tasks</h2>
            <Card style={{ width: '50%', margin: '0 auto' }}>
                <Card.Header>
                    <h3 className="float-start">All tasks</h3>
                    <Button variant="primary" className="float-end" onClick={handleShow}>Add task</Button>
                </Card.Header>
                <Card.Body>
                    <TasksList tasks={tasks} />
                    <TaskAddModal ref={taskAddModalRef} />
                </Card.Body>
            </Card>
        </div>
    );
}

export default TodoList;
