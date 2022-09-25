// import logo from './assets/logo.svg';
import './styles/App.css';

import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './store/rootStore';

import TodoList from './pages/TodoList';
import Layout from './pages/Layout';
import About from './pages/About';
import Empty from './pages/Empty';

function App() {
      
    return (
        <div className="App">
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                            <Route index element={<TodoList />} />
                            <Route path="about" element={<About />} />
                            <Route path="*" element={<Empty />} />
                    </Route>
                </Routes>
            </Provider>
        </div>
    );
}

export default App;
