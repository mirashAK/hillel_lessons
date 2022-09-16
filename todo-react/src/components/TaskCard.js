import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Trash } from 'react-bootstrap-icons';

class TaskCard extends React.Component {
    constructor(props) {
        super(props); 
        
        const {task} = props;
        this.task = task;
    }
    render() {
        return (  
            <Card>
                <Card.Header>
                    <label className="task-name float-start">
                        <input
                            type="checkbox" 
                            className="form-check-input task-complete"
                            checked={this.task.isCompleted}
                            onChange={e => this.props.onChangeCompleted(this.task.id)}/>{this. task.name }
                    </label>
                    <Button className="float-end" variant="danger" onClick={e => this.props.onRemoveTask(this.task.id)}><Trash /></Button>
                </Card.Header>
                <Card.Body>{ this.task.description }</Card.Body>
            </Card>
        );
    }
};

export default TaskCard;
