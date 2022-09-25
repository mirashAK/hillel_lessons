import React from 'react';
import { useDispatch } from 'react-redux';
import { markTodo, markTodoTask, delTodoTask } from '../store/todoListSlice';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Trash } from 'react-bootstrap-icons';

const TaskCard = function({task}) {

    const dispatch = useDispatch();
    
    return (  
        <Card>
            <Card.Header>
                <label className="task-name float-start">
                    <input
                        type="checkbox" 
                        className="form-check-input task-complete"
                        checked={task.isCompleted}
                        onChange={e => dispatch(markTodo(task.id))}/>{task.name}
                </label>
                <Button className="float-end" variant="danger" onClick={e => dispatch({type: 'todoList/delTodoTask', payload: task.id})}><Trash /></Button>
            </Card.Header>
            <Card.Body>{ task.description }</Card.Body>
        </Card>
    );
    
};

export default TaskCard;
