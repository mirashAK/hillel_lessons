// import logo from './assets/logo.svg';
import './styles/App.css';

import React, { useState, useRef } from 'react';
import TodoList from './components/TodoList';

function App() {
      
    return (
        <div className="App">
            <TodoList />
        </div>
    );
}

export default App;
