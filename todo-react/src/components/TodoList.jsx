import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addTodoTask, increment } from '../store/todoListSlice';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import TasksList from './TasksList';
import TaskAddModal from './TaskAddModal';

class Task {
    constructor(name = 'test', description, isCompleted = false,  id) {
        this.id = id || new Date().getTime();
        this.name = name;
        this.description = description ||  'test Descr';
        this.isCompleted = false;
    }
}

function TodoList() {
    
    const tasks = useSelector(state => state.todoList.value);
    const dispatch = useDispatch();
    
    const addTask = (task) => {
        dispatch(addTodoTask(task))
    }
    
    const handleAddTask = ({name, description} = {}) => {
        addTask(new Task(name, description))
        taskAddModalRef.current.hide();
    }
    
    const taskAddModalRef = useRef();
    const handleShow = () => taskAddModalRef.current.show();
    
    const setTasks = ()=>true;
    
    return (
        <div className="TodoList">
            <h2>My Tasks</h2>
            <Card style={{ width: '50%', margin: '0 auto' }}>
                <Card.Header>
                    <h3 className="float-start">All tasks</h3>
                    <Button variant="primary" className="float-end" onClick={handleShow}>Add task</Button>
                </Card.Header>
                <Card.Body>
                    <TasksList tasks={tasks} setTasks={setTasks} />
                    <TaskAddModal ref={taskAddModalRef} onSubmit={handleAddTask} />
                </Card.Body>
            </Card>
        </div>
    );
}

export default TodoList;
