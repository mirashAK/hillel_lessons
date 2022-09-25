import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import TasksList from './TasksList';
import TaskAddModal from './TaskAddModal';

import {fetchTodosThunk, updTodoTask} from '../store/todoListSlice.js';
import REQ_STATS from '../helpers/statuses.js';

function TodoList() {
    
    const tasks = useSelector(state => state.todoList.tasks);
    const tasksStatus = useSelector(state => state.todoList.status)

    const taskAddModalRef = useRef();
    const handleShow = () => taskAddModalRef.current.show();
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (tasksStatus === REQ_STATS.IDLE) {
            dispatch(fetchTodosThunk())
        }
    }, [tasksStatus])

    return (
        <div className="TodoList">
            <h2>My Tasks</h2>
            <Card style={{ width: '80%', margin: '0 auto' }}>
                <Card.Header>
                    <h3 className="float-start">All tasks</h3>
                    <Button variant="primary" className="float-end" onClick={handleShow}>Add task</Button>
                </Card.Header>
                <Card.Body>
                    {
                        (tasksStatus == 'succeeded') 
                        ? <TasksList tasks={tasks} /> 
                        : <Spinner animation="border" variant="primary" />
                    }
                    <TaskAddModal ref={taskAddModalRef} />
                </Card.Body>
            </Card>
        </div>
    );
}

export default TodoList;
