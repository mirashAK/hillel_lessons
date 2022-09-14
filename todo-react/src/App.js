import logo from './assets/logo.svg';
import './styles/App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
        <h2>My Tasks</h2>
        <Card style={{ width: '50%', margin: '0 auto' }}>
            <Card.Header as="h5"><Button variant="primary">Add task</Button></Card.Header>
            <Card.Body>
                <Card.Title>All tasks</Card.Title>
                Tasks
            </Card.Body>
        </Card>
    </div>
  );
}

export default App;
