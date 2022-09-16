// import logo from './assets/logo.svg';
import './styles/App.css';

import React, { useState, useRef } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import TodoList from './components/TodoList';
import Layout from './pages/Layout';
import About from './pages/About';
import Empty from './pages/Empty';

function App() {
      
    return (
        <div className="App">
            
            <Routes>
                <Route path="/" element={<Layout />}>
                        <Route index element={<TodoList />} />
                        <Route path="about" element={<About />} />

                        {/* Using path="*"" means "match anything", so this route
                                acts like a catch-all for URLs that we don't have explicit
                                routes for. */}
                        <Route path="*" element={<Empty />} />
                </Route>
            </Routes>
            
        </div>
    );
}

export default App;
