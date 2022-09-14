import logo from './assets/logo.svg';
import './styles/App.css';

import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
    
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount(count +1);
    
    return (
        <div className="App">
            <h2>My Tasks</h2>
            <Card style={{ width: '50%', margin: '0 auto' }}>
                <Card.Header>
                    <h3 className="float-start">All tasks</h3>
                    <Button variant="primary" className="float-end" onClick={incrementCount}>Add task</Button>
                </Card.Header>
                <Card.Body>
                    
                    Tasks count: {count}
                </Card.Body>
            </Card>
        </div>
    );
}

export default App;
