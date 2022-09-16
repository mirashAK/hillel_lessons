import ListGroup from 'react-bootstrap/ListGroup';   

import TaskCard from './TaskCard';

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
                    <TaskCard task={task} onChangeCompleted={onChangeCompleted} onRemoveTask={onRemoveTask}/>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default TasksList;
