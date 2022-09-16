import ListGroup from 'react-bootstrap/ListGroup';   

import TaskCard from './TaskCard';

const TasksList = function({tasks}) {
    
    return (
        <ListGroup>
            {tasks.map( (task) =>
                <ListGroup.Item as="li" key={task.id}>
                    <TaskCard task={task} />
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default TasksList;
