import React , { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { Task, fetchTodoThunk, putTodoThunk } from '../store/todoListSlice';

function TodoEdit() {
    
    const  { taskId }  = useParams();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [editTask, setEditTask] = useState({});
    const [editTaskLoader, setEditTaskLoader] = useState(true);
    const tasks = useSelector(state => state.todoList.tasks);
    const tasksStatus = useSelector(state => state.todoList.status);
    
    useEffect(() => {
        const currTask = tasks.filter((task)=>task.id === +taskId);
        if (currTask.length == 1) {
            const {name, description, isCompleted,  id} = currTask[0];
            setEditTask(new Task(name, description, isCompleted,  id));
            setEditTaskLoader(false);
        } else {
            dispatch(fetchTodoThunk(+taskId))
            .then((task)=>{
                const {name, description, isCompleted,  id} = task;
                setEditTask(new Task(name, description, isCompleted,  id));
                setEditTaskLoader(false);
            })
            .catch((err)=>{
                console.error(err);
                navigate('/todo');
            })
        }
    }, [taskId, editTaskLoader]);
    
    return (
        <Card style={{ width: '40%', margin: '0 auto' }}>
            <Card.Header>
                <h3 className="float-start">TodoEdit {taskId}</h3>
            </Card.Header>
            <Card.Body>
                {
                    editTaskLoader === true
                    ? <Spinner animation="border" variant="primary" />
                    : <TaskForm editTask={editTask} setEditTask={setEditTask}/>
                }
            </Card.Body>
        </Card>
    );
}

function TaskForm(props) {
    const {editTask, setEditTask} = props;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function handleClose(){};
    function handleEditTask(){};
    
    
    return (
        <>
            <Form name="EditTaskForm">
                <Form.Group className="mb-3">
                    <Form.Label>Task name: </Form.Label>
                    <Form.Control 
                        value={editTask.name || ''}
                        onChange={(ev)=>{
                            setEditTask(task => ({...task, name: ev.target.value}))
                        }}
                        type="text"
                        placeholder="Enter task name" 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Task description: </Form.Label>
                    <Form.Control 
                        value={editTask.description || ''}
                        onChange={(ev)=>{
                            setEditTask(task => ({...task, description: ev.target.value}))
                        }}
                        as="textarea"
                        rows={3}
                        placeholder="Enter task description"
                    />
                </Form.Group>
            </Form>
            <Button variant="success" className="float-start" 
                onClick={async (ev)=> {
                    await dispatch(putTodoThunk(editTask));
                    navigate('/');
                }}
                >
                Edit
            </Button>
            <Button variant="secondary" className="float-end" 
                    onClick={(ev)=>navigate('/')}
                >
                Cancel
            </Button>
        </>
    )
}

export default TodoEdit;
