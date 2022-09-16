import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';   
import { Trash } from 'react-bootstrap-icons';

const TasksList = function({tasks, setTasks}) {
    
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
    );
}

export default TasksList;
