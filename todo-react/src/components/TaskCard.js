import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { markTodo, markTodoTask, delTodoTask } from '../store/todoListSlice';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Trash, Pencil } from 'react-bootstrap-icons';

const TaskCard = function({task}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navToTask = (ev, taskId)=>{
        navigate(`/todo/${taskId}`);
    }
    
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
                <ButtonToolbar className="float-end">
                    <ButtonGroup className="me-4">
                        <Button variant="success">
                            <Link to={'todo/'+task.id} style={{ color: 'white' }}>
                                <Pencil />
                            </Link>
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-4">
                        <Button variant="primary" onClick={e => navToTask(e, task.id)}>
                             <Pencil />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="danger"  onClick={e => dispatch({type: 'todoList/delTodoTask', payload: task.id})}>
                            <Trash />
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Card.Header>
            <Card.Body>{ task.description }</Card.Body>
        </Card>
    );
    
};

export default TaskCard;
